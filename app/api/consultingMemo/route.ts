import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { title, content, location } = body;
    console.log(body);

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
    })

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
      return NextResponse.json(docSnap.data(), { status: 200 });
    } else {
      return new NextResponse("메모가 존재하지 않습니다.", { status: 404 });
    }
  } catch (error) {
    console.error("consultiongMemo GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", { status: 500 });
  }
}