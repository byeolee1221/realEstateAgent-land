import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { addDoc, collection } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { title, content } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const addContact = await addDoc(collection(db, "contact"), {
      userEmail: session.user?.email,
      userName: session.user?.name,
      userImage: session.user?.image,
      title,
      content,
      createdAt: Date.now()
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("contact POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 잠시 후 다시 문의해주세요.", { status: 500 });
  }
}