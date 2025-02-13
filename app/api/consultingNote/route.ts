import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "@/app/firebase";
 
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { customerName, customerNumber, purposeUse, kind, transactionType, date, content, location } = body;
    // console.log(body);
    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!customerName || !customerNumber || !purposeUse || !kind || !transactionType || !date || !content || !location) {
      return new NextResponse("입력하신 내용을 다시 확인해주세요.", { status: 400 });
    }

    const addNote = await addDoc(collection(db, "consultingNote"), {
      userName: session.user?.name,
      userEmail: session.user?.email,
      customerName,
      customerNumber,
      purposeUse,
      kind,
      transactionType,
      date,
      content,
      location,
      createdAt: Date.now(),
    });

    // 무료사용횟수 조회
    const countSnapshot = query(collection(db, "freeCount"), where("userEmail", "==", session.user?.email));
    const querySnapshot = await getDocs(countSnapshot);
    let docId: string = "";

    querySnapshot.forEach((doc) => {
      docId = doc.id
    });

    const getCount = doc(db, "freeCount", docId);
    const countDocSnap = await getDoc(getCount); 
    let freeCount: number = 1;
    let memoFreeCount: number = 5; // 초기값을 존재해야 수정 시 NaN를 안뜨게 할 수 있다.

    if (countDocSnap.exists()) {
      freeCount = countDocSnap.data().freeCount;
      memoFreeCount = countDocSnap.data().memoFreeCount;
    }

    // 무료사용횟수 문서 생성 또는 업데이트 및 횟수 차감
    if (addNote && !countDocSnap.exists() && freeCount !== 0) {
      const addFreeCount = await addDoc(collection(db, "freeCount"), {
        userName: session.user?.name,
        userEmail: session.user?.email,
        freeCount: freeCount - 1,
        memoFreeCount, 
        createdAt: Date.now()
      });
    } else if (addNote && countDocSnap.exists() && freeCount !== 0) {
      const updateFreeCount = await setDoc(doc(db, "freeCount", docId), {
        freeCount: freeCount - 1,
        createdAt: Date.now()
      }, { merge: true });
    }

    return NextResponse.json(addNote.id, { status: 200 });
  } catch (error) {
    console.error("consultiongNote POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 잠시 후 다시 업로드해주세요.", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { postPath } = body;
    // console.log(postPath);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!postPath) {
      return new NextResponse("게시물 주소가 올바르지 않습니다.", { status: 404 });
    }

    const deletePost = deleteDoc(doc(db, "consultingNote", postPath));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("consultiongNote DELETE API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 잠시 후 다시 시도해주세요.", { status: 500 });
  }
}