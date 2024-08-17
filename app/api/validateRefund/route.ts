import { db } from "@/app/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userEmail } = await req.json();

    if (!userEmail) {
      return new NextResponse("유저 이메일이 올바르지 않습니다.", { status: 404 });
    }

    const noteQuery = query(collection(db, "consultingNote"), where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(noteQuery);
    const noteCount = querySnapshot.docs.length;

    const memoQuery = query(collection(db, "consultingMemo"), where("userEmail", "==", userEmail));
    const memoSnapshot = await getDocs(memoQuery);
    const memoCount = memoSnapshot.docs.length;

    const docObj = {
      note: noteCount,
      memo: memoCount
    }

    return NextResponse.json(docObj, { status: 200 });
  } catch (error) {
    console.error("validateRefund GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 업로드정보를 가져오지 못했습니다.", { status: 500 });
  }
}