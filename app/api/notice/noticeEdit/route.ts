import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const noticeUrl = req.url.split("/");
    const noticeId = noticeUrl[7];
    // console.log(noticeId);

    if (!session) {
      return new NextResponse("관리자만 들어올 수 있습니다.", { status: 401 });
    };

    const userSnapshot = query(collection(db, "users"), where("email", "==", session?.user?.email));
    
    const querySnapshot = await getDocs(userSnapshot);
    let userId: string = "";

    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });

    if (userId !== "lDYn9yuhI6acZ9hNstpW") {
      return new NextResponse("관리자만 공지사항을 수정할 수 있습니다.", { status: 403 });
    }

    const docRef = doc(db, "notice", noticeId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data(), { status: 200 });
    }
  } catch (error) {
    console.error("notice noticeEdit GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const noticeUrl = req.url.split("/");
    const noticeId = noticeUrl[7];
    const { title, content } = body;
    // console.log(noticeUrl);

    if (!session) {
      return new NextResponse("관리자만 들어올 수 있습니다.", { status: 401 });
    };

    if (!title || !content) {
      return new NextResponse("입력하신 내용을 다시 확인해주세요.", { status: 400 });
    }

    const editNotice = await setDoc(doc(db, "notice", noticeId), {
      authorEmail: session.user?.email,
      title,
      content,
      createdAt: Date.now()
    });

    return NextResponse.json(noticeId, { status: 200 });
  } catch (error) {
    console.error("notice noticeEdit POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 잠시 후 다시 시도해주세요.", { status: 500 });
  }
}