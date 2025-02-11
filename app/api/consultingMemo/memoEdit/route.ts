import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { memoId, currentUser, title, content, location } = body;
    // console.log(memoId);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!currentUser || !title || !content || !location) {
      return new NextResponse("입력하신 내용을 다시 확인해주세요.", {
        status: 400,
      });
    }

    if (currentUser === session.user?.email) {
      const editMemo = await setDoc(doc(db, "consultingMemo", memoId), {
        userName: session.user?.name,
        userEmail: session.user?.email,
        title,
        content,
        location,
        createdAt: Date.now(),
      });
    } else {
      return new NextResponse("본인의 중개메모만 조회할 수 있습니다.", {
        status: 401,
      });
    }

    return NextResponse.json(memoId, { status: 200 });
  } catch (error) {
    console.error("consultiongMemo memoEdit POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 잠시 후 다시 시도해주세요.", {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const memoId = searchParams.get("memoId");
    // console.log(memoId);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!memoId) {
      return new NextResponse("메모 ID가 필요합니다.", { status: 400 });
    }

    const docRef = doc(db, "consultingMemo", memoId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data());
      return NextResponse.json(docSnap.data(), { status: 200 });
    } else {
      return new NextResponse("게시글이 존재하지 않습니다.", { status: 404 });
    }
  } catch (error) {
    console.error("consultiongMemo memoEdit GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", { status: 500 });
  }
}
