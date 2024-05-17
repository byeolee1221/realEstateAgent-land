import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore";
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
      return new NextResponse("입력하신 내용을 다시 확인해주세요.", { status: 404 });
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

    return NextResponse.json(addNote.id, { status: 200 });
  } catch (error) {
    console.log("consultiongNote POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 잠시 후 다시 업로드해주세요.", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const url = req.url.split("url=/consultingNote/");
    const noteId = url[1];

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const docRef = doc(db, "consultingNote", noteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data());
      return NextResponse.json(docSnap.data(), { status: 200 });
    } else {
      return new NextResponse("게시글이 존재하지 않습니다.", { status: 404 });
    }
  } catch (error) {
    console.log("consultiongNote GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { postPath } = body;
    console.log(postPath);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!postPath) {
      return new NextResponse("게시물 주소가 올바르지 않습니다.", { status: 404 });
    }

    const deletePost = deleteDoc(doc(db, "consultingNote", postPath));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("consultiongNote DELETE API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 잠시 후 다시 시도해주세요.", { status: 500 });
  }
}