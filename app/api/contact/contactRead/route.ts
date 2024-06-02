import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const url = req.url.split("id=");
    const contactId = url[1];
    // console.log(contactId);

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

    const docRef = doc(db, "contact", contactId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let contactData = docSnap.data();
      contactData.id = docSnap.id;

      const createdAt = new Date(contactData.createdAt);
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      contactData.createdAt = formatDate(createdAt);
      return NextResponse.json(contactData, { status: 200 });
    } else {
      return new NextResponse("해당 문의가 존재하지 않습니다.", { status: 404 });
    }
  } catch (error) {
    console.error("contactRead GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", { status: 500 });
  }
}