import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const q = query(
      collection(db, "consultingMemo"),
      where("userEmail", "==", session?.user?.email)
    );

    const querySnapshot = await getDocs(q);
    let matchData: any[] = [];
    let memoData;

    querySnapshot.forEach((doc) => {
      if (doc !== undefined) {
        memoData = doc.data();
        memoData.id = doc.id;
        matchData.push(memoData);
      } else {
        return new NextResponse("아직 등록한 메모가 없습니다.", {
          status: 404,
        });
      }
    });

    // console.log(matchData);

    return NextResponse.json(matchData, { status: 200 });
  } catch (error) {
    console.error("consultiongMemo memoList GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", {
      status: 500,
    });
  }
}
