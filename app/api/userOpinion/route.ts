import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { opinion } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!opinion) {
      return new NextResponse("입력하신 내용을 확인해주세요.", { status: 404 });
    }

    const addOpinion = await addDoc(collection(db, "opinion"), {
      userName: session.user?.name,
      userEmail: session.user?.email,
      userImage: session.user?.image,
      opinion,
      createdAt: Date.now()
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("userOpinion POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 발송되지 않았습니다. 잠시 후 다시 시도해주세요.", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("관리자만 조회할 수 있습니다.", { status: 401 });
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

    const opinionQuerySnapshot = await getDocs(collection(db, "opinion"));
    let matchData: any[] = [];

    if (opinionQuerySnapshot.empty) {
      return new NextResponse("아직 접수된 개선사항이 없습니다.", { status: 404 });
    }

    opinionQuerySnapshot.forEach((doc) => {
      let opinionData = doc.data();
      opinionData.id = doc.id;

      const createdAt = new Date(opinionData.createdAt);
      const formatCreatedAt = formatDate(createdAt);

      opinionData.createdAt = formatCreatedAt;
      matchData.push(opinionData);
    });

    return NextResponse.json(matchData, { status: 200 });
  } catch (error) {
    console.error("userOpinion GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 개선사항문의를 불러오지 못했습니다.", { status: 500 });
  }
}