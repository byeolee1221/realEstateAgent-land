import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const q = query(collection(db, "consultingNote"), where("userEmail", "==", session.user?.email));

    const querySnapshot = await getDocs(q);
    let matchData: any = [];
    let noteListData;

    querySnapshot.forEach((doc) => {
      if (doc !== undefined) {
        noteListData = doc.data();
        noteListData.id = doc.id;
        matchData.push(noteListData);
      } else {
        return new NextResponse("아직 등록한 노트가 없습니다.", { status: 404 });
      }
    });
    
    // console.log(matchData);
    return NextResponse.json(matchData, { status: 200 });
  } catch (error) {
    console.log("consultiongNote noteList GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", { status: 500 });
  }
}
