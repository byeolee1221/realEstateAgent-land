import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { title, content, location } = body;
    // console.log(body);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!title || !content || !location) {
      return new NextResponse("입력하신 내용을 다시 확인해주세요.", { status: 400 });
    }

    const addMemo = await addDoc(collection(db, "consultingMemo"), {
      userName: session.user?.name,
      userEmail: session.user?.email,
      title,
      content,
      location,
      createdAt: Date.now()
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
    let memoFreeCount: number = 5;
    let freeCount: number = 1; // 초기값을 존재해야 수정 시 NaN를 안뜨게 할 수 있다.

    if (countDocSnap.exists()) {
      memoFreeCount = countDocSnap.data().memoFreeCount;
      freeCount = countDocSnap.data().freeCount;
    }

    // 무료사용횟수 문서 생성 또는 업데이트 및 횟수 차감
    if (addMemo && !countDocSnap.exists() && memoFreeCount !== 0) {
      const addFreeCount = await addDoc(collection(db, "freeCount"), {
        userName: session.user?.name,
        userEmail: session.user?.email,
        memoFreeCount: memoFreeCount - 1,
        freeCount,
        createdAt: Date.now()
      });
    } else if (addMemo && countDocSnap.exists() && memoFreeCount !== 0) {
      const updateFreeCount = await setDoc(doc(db, "freeCount", docId), {
        memoFreeCount: memoFreeCount - 1,
        createdAt: Date.now()
      }, { merge: true });
    }

    return NextResponse.json(addMemo.id, { status: 200 });
  } catch (error) {
    console.error("consultiongMemo POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 잠시 후 다시 업로드해주세요.", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const url = req.url.split("url=/consultingMemo/");
    const memoId = url[1];

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const docRef = doc(db, "consultingMemo", memoId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data());
      return NextResponse.json({ ...docSnap.data(), id: docSnap.id }, { status: 200 });
    } else {
      return new NextResponse("메모가 존재하지 않습니다.", { status: 404 });
    }
  } catch (error) {
    console.error("consultiongMemo GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { memoPath } = body;
    // console.log(memoPath);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!memoPath) {
      return new NextResponse("게시물 주소가 올바르지 않습니다.", { status: 404 });
    }

    const deleteMemo = deleteDoc(doc(db, "consultingMemo", memoPath));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("consultiongMemo DELETE API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 잠시 후 다시 시도해주세요.", { status: 500 });
  }
}