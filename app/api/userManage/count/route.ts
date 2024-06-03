import { db } from "@/app/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = req.url.split("?id=");
    const userId = url[1];
    // console.log(userId);

    if (!userId) {
      return new NextResponse("유저ID가 올바르지 않습니다.", { status: 404 });
    }

    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    let userEmail: string = "";

    if (docSnap.exists()) {
      const data = docSnap.data();
      userEmail = data.email;
    }
    
    const noteQuery = query(collection(db, "consultingNote"), where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(noteQuery);
    const noteCount = querySnapshot.docs.length;

    const memoQuery = query(collection(db, "consultingMemo"), where("userEmail", "==", userEmail));
    const memoSnapshot = await getDocs(memoQuery);
    const memoCount = memoSnapshot.docs.length;
    // console.log(noteCount, memoCount);

    const docObj = {
      note: noteCount,
      memo: memoCount
    }

    return NextResponse.json(docObj, { status: 200 });
  } catch (error) {
    console.error("userManage count GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였으니 새로고침해주세요.", { status: 500 });
  }
}