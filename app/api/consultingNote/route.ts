import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase";
 
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { customerName, customerNumber, purposeUse, kind, transactionType, date, content, location } = body;
    console.log(body)
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