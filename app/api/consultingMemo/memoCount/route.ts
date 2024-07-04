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

    const countSnapshot = query(collection(db, "freeCount"), where("userEmail", "==", session.user?.email));
    const querySnapshot = await getDocs(countSnapshot);
    let docId: string = "";

    querySnapshot.forEach((doc) => {
      docId = doc.id
    });

    const getCount = doc(db, "freeCount", docId);
    const countDocSnap = await getDoc(getCount);
    let count: number;
  
    if (countDocSnap.exists()) {
      count = countDocSnap.data().memoFreeCount;
      return NextResponse.json(count, { status: 200 });
    }

  } catch (error) {
    console.error("memoCount GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 정보를 불러오지 못했습니다.", { status: 500 });
  }
}