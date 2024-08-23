import { db } from "@/app/firebase";
import { formatDate } from "@/lib/utils";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const noticeQuerySnapshot = await getDocs(collection(db, "notice"));
    let matchData: any[] = [];

    if (noticeQuerySnapshot.empty) {
      return new NextResponse("아직 등록된 공지사항이 없습니다.", { status: 404 });
    }

    noticeQuerySnapshot.forEach((doc) => {
      let noticeData = doc.data();
      noticeData.id = doc.id;

      const createdAt = new Date(noticeData.createdAt);
      const formatCreatedAt = formatDate(createdAt);
      
      noticeData.createdAt = formatCreatedAt;
      matchData.push(noticeData);
    });

    return NextResponse.json(matchData, { status: 200 });
  } catch (error) {
    console.error("notice noticeList GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", {
      status: 500,
    });
  }
}