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
    const { title, content } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const addContact = await addDoc(collection(db, "contact"), {
      userEmail: session.user?.email,
      userName: session.user?.name,
      userImage: session.user?.image,
      title,
      content,
      createdAt: Date.now()
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("contact POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 잠시 후 다시 문의해주세요.", { status: 500 });
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

    const contactQuerySnapshot = await getDocs(collection(db, "contact"));
    let matchData: any[] = [];

    if (contactQuerySnapshot.empty) {
      return new NextResponse("아직 접수된 문의가 없습니다.", { status: 404 });
    }

    contactQuerySnapshot.forEach((doc) => {
      let contactData = doc.data();
      contactData.id = doc.id;

      const createdAt = new Date(contactData.createdAt);
      const formatCreatedAt = formatDate(createdAt);
      
      contactData.createdAt = formatCreatedAt;
      matchData.push(contactData);
    });

    return NextResponse.json(matchData, { status: 200 });
  } catch (error) {
    console.error("contact GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", {
      status: 500,
    });
  }
}