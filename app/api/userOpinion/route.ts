import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { addDoc, collection } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { opinion } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!opinion) {
      return new NextResponse("입력하신 내용을 확인해주세요.", { status: 404 });
    }

    const addOpinion = await addDoc(collection(db, "opinion"), {
      userName: session.user?.name,
      userEmail: session.user?.email,
      userImage: session.user?.image,
      opinion,
      createdAt: Date.now()
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("userOpinion POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 발송되지 않았습니다. 잠시 후 다시 시도해주세요.", { status: 500 });
  }
}