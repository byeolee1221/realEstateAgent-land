import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const paymentSnapshot = query(
      collection(db, "subscription"),
      where("userEmail", "==", session?.user?.email)
    );
    const querySnapshot = await getDocs(paymentSnapshot);
    let docId: string = "";

    querySnapshot.forEach((doc) => {
      docId = doc.id;
    });

    const paymentDocRef = doc(db, "subscription", docId);
    const paymentDocSnap = await getDoc(paymentDocRef);
    let approvedAt: string = "";

    if (paymentDocSnap.exists()) {
      approvedAt = paymentDocSnap.data().approved_at;
    }

    const nextDate = new Date(approvedAt);
    nextDate.setMonth(nextDate.getMonth() + 1);
    const formattedNextDate = nextDate.toISOString().split("T")[0];

    return NextResponse.json({ approvedAt, formattedNextDate }, { status: 200 });
  } catch (error) {
    console.error("subscriptionUpdateInfo GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 구독일 정보를 불러오지 못했습니다.", { status: 500 });
  }
}