import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// 전체유저정보가 아닌 조회대상 유저 개개인의 업데이트 정보 
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { sid } = await req.json();

    if (!session) {
      return new NextResponse("세션 오류입니다.", { status: 401 });
    }

    if (!sid) {
      return new NextResponse("조회대상의 sid 정보를 다시 확인해주세요.", { status: 400 });
    }

    const userSnapshot = query(collection(db, "users"), where("email", "==", session.user?.email));
    
    const querySnapshot = await getDocs(userSnapshot);
    let userId: string = "";

    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });

    if (userId !== `${process.env.ADMIN_ID}`) {
      return new NextResponse("관리자만 조회할 수 있습니다.", { status: 403 })
    }

    const userUpdateInfo = query(collection(db, "subscription"), where("sid", "==", sid));
    const infoSnapshot = await getDocs(userUpdateInfo);
    let approvedAt: string = "";

    infoSnapshot.forEach((doc) => {
      const data = doc.data();
      approvedAt = data.approved_at
    });

    const formatDate = approvedAt.split("T")[0];
   
    return NextResponse.json(formatDate, { status: 200 });
  } catch (error) {
    console.error("subscriptionManage UpdateUser POST에서 오류 발생", error);
    return new NextResponse("UpdateUser POST 오류 발생", { status: 500 });
  }
}