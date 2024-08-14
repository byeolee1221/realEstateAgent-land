import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("세션 오류입니다.", { status: 401 });
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

    const userQuerySnapshot = await getDocs(collection(db, "users"));
    let matchData: any[] = [];

    if (userQuerySnapshot.empty) {
      return new NextResponse("가입된 유저가 없습니다.", { status: 404 });
    }

    userQuerySnapshot.forEach((doc) => {
      let userData = doc.data();
      userData.id = doc.id;
      
      matchData.push(userData);
    });

    return NextResponse.json(matchData, { status: 200 });
  } catch (error) {
    console.error("userManage userList GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", {
      status: 500,
    });
  }
}