import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { title, content } = body;
    // console.log(body);

    // 유저ID 추출
    const userSnapshot = query(collection(db, "users"), where("email", "==", session?.user?.email));
    
    const querySnapshot = await getDocs(userSnapshot);
    let userId: string = "";

    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });

    if (userId !== "lDYn9yuhI6acZ9hNstpW") {
      return new NextResponse("관리자만 공지사항을 작성할 수 있습니다.", { status: 403 });
    }

    if (!title || !content) {
      return new NextResponse("입력하신 내용을 다시 확인해주세요.", { status: 400 });
    }

    const addNotice = await addDoc(collection(db, "notice"), {
      authorEmail: session?.user?.email,
      title,
      content,
      createdAt: Date.now()
    });

    return NextResponse.json(addNotice.id, { status: 200 });
  } catch (error) {
    console.error("notice POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 잠시 후 다시 업로드해주세요.", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = req.url.split("url=/notice/");
    const noteId = url[1];
    // console.log(noteId);

    const docRef = doc(db, "notice", noteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data(), { status: 200 });
    } else {
      return new NextResponse("게시글이 존재하지 않습니다.", { status: 404 });
    }
  } catch (error) {
    console.error("notice GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { noticePath } = body;
    // console.log(noticePath);

    const userSnapshot = query(collection(db, "users"), where("email", "==", session?.user?.email));
    
    const querySnapshot = await getDocs(userSnapshot);
    let userId: string = "";

    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });

    if (userId !== "lDYn9yuhI6acZ9hNstpW") {
      return new NextResponse("관리자만 공지사항을 삭제할 수 있습니다.", { status: 403 });
    }

    if (!noticePath) {
      return new NextResponse("게시물 주소가 올바르지 않습니다.", { status: 404 });
    }

    const deleteNotice = deleteDoc(doc(db, "notice", noticePath));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("notice DELETE API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 잠시 후 다시 시도해주세요.", { status: 500 });
  }
}