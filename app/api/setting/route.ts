import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    // 유저ID 추출
    const userSnapshot = query(collection(db, "users"), where("email", "==", session.user?.email));
    
    const querySnapshot = await getDocs(userSnapshot);
    let userId: string = "";

    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });

    // 유저 게시물 추출
    const userNoteSnapshot = await getDocs(query(collection(db, "consultingNote"), where("userEmail", "==", session.user?.email)));
    const userNoteDoc = userNoteSnapshot.docs;

    const userMemoSnapshot = await getDocs(query(collection(db, "consultingMemo"), where("userEmail", "==", session.user?.email)));
    const userMemoDoc = userMemoSnapshot.docs;

    // console.log(userNoteDoc, userMemoDoc);

    // 유저 게시물 삭제
    for (let doc of userNoteDoc) {
      await deleteDoc(doc.ref);
    }

    for (let doc of userMemoDoc) {
      await deleteDoc(doc.ref);
    } 

    // DB 내 3개 colleation의 유저정보 추출
    const usersDBSnapshot = await getDocs(query(collection(db, "users"), where("email", "==", session.user?.email)));
    const usersDBDoc = usersDBSnapshot.docs[0];
    
    const usersAccountSnapshot = await getDocs(query(collection(db, "accounts"), where("userId", "==", userId)));
    const usersAccountDoc = usersAccountSnapshot.docs[0];

    const usersSessionSnapshot = await getDocs(query(collection(db, "sessions"), where("userId", "==", userId)));
    const usersSessionDoc = usersSessionSnapshot.docs;

    // 유저정보가 모두 추출될 시 정보 삭제
    if (usersDBDoc && usersAccountDoc && usersSessionDoc) {
      await deleteDoc(usersDBDoc.ref);
      await deleteDoc(usersAccountDoc.ref);
      
      for (let doc of usersSessionDoc) {
        await deleteDoc(doc.ref);
      }
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("setting DELETE API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 연동해제되지 않았습니다. 다시 시도해주세요.", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const userSnapshot = query(collection(db, "users"), where("email", "==", session?.user?.email));
    
    const querySnapshot = await getDocs(userSnapshot);
    let userId: string = "";

    querySnapshot.forEach((doc) => {
      userId = doc.id;
    });

    let adminCheck: boolean;

    if (userId === `${process.env.ADMIN_ID}`) {
      adminCheck = true;
    } else {
      adminCheck = false;
    }

    return NextResponse.json(adminCheck, { status: 200 });
  } catch (error) {
    console.error("setting GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 정보를 가져오지 못했습니다.", { status: 500 });
  }
}