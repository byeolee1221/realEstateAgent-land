import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const url = req.url.split("id=");
    const opinionId = url[1];
    // console.log(opinionId);

    if (!session) {
      return new NextResponse("관리자만 조회할 수 있습니다.", { status: 401 });
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

    const opinionDocRef = doc(db, "opinion", opinionId);
    const docSnap = await getDoc(opinionDocRef);

    if (docSnap.exists()) {
      let opinionData = docSnap.data();
      opinionData.id = docSnap.id;

      const createdAt = new Date(opinionData.createdAt);
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      opinionData.createdAt = formatDate(createdAt);
      return NextResponse.json(opinionData, { status: 200 });
    } else {
      return new NextResponse("해당 개선의견이 존재하지 않습니다.", { status: 404 });
    }

  } catch (error) {
    console.error("opinionRead GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 해당 의견을 불러오지 못했습니다.", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    // console.log(id);

    if (!id) {
      return new NextResponse("게시물 주소가 올바르지 않습니다.", { status: 404 });
    }

    const deleteOpinion = deleteDoc(doc(db, "opinion", id));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("opinionRead DELETE API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 삭제하지 못했습니다.", { status: 500 });
  }
}