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

    if (userId !== "lDYn9yuhI6acZ9hNstpW") {
      return new NextResponse("관리자만 조회할 수 있습니다.", { status: 403 })
    }

    const subscriptionQuerySnapshot = await getDocs(collection(db, "subscription"));
    let matchData: any[] = [];

    if (subscriptionQuerySnapshot.empty) {
      return new NextResponse("구독한 유저가 없습니다.", { status: 404 });
    }

    subscriptionQuerySnapshot.forEach((doc) => {
      let subscriptionData = doc.data();
      subscriptionData.id = doc.id;

      const approvedAt = new Date(subscriptionData.approved_at);
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      subscriptionData.approvedAt = formatDate(approvedAt);
      matchData.push(subscriptionData);
    });

    // console.log(matchData);
    return NextResponse.json(matchData, { status: 200 });
  } catch (error) {
    console.error("subscriptionManage POST API에서 오류 발생", error);
    return new NextResponse("API 오류 발생", { status: 500 });
  }
}