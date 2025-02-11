"use server";

import { db } from "@/app/firebase";
import { getDocs } from "firebase/firestore";
import { authOptions } from "@/lib/auth";
import { collection, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { formatDate } from "@/lib/utils";

// 관리자 권한 확인
const checkAdminAuth = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error("로그인이 필요한 서비스입니다.");
  }

  const userSnapshot = query(
    collection(db, "users"), 
    where("email", "==", session.user?.email)
  );
  
  const querySnapshot = await getDocs(userSnapshot);
  let userId = "";

  querySnapshot.forEach((doc) => {
    userId = doc.id;
  });

  if (userId !== process.env.ADMIN_ID) {
    throw new Error("관리자만 접근할 수 있는 서비스입니다.");
  }
}

// 사용자 데이터
export const getUserManageData = async () => {
  try {
    await checkAdminAuth();

    const userQuerySnapshot = await getDocs(collection(db, "users"));
    
    if (userQuerySnapshot.empty) {
      return [];
    }

    return userQuerySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })); 
  } catch (error) {
    console.error("사용자 데이터를 불러오는데 실패했습니다.", error);
    throw new Error("사용자 데이터를 불러오는데 실패했습니다.");
  }
}

// 문의사항 데이터
export const getContactData = async () => {
  try {
    await checkAdminAuth();

    const contactSnapshot = await getDocs(collection(db, "contact"));
    
    if (contactSnapshot.empty) {
      return [];
    }

    return contactSnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      userName: doc.data().userName,
      userEmail: doc.data().userEmail,
      userImage: doc.data().userImage,
      createdAt: formatDate(new Date(doc.data().createdAt))
    }));
  } catch (error) {
    console.error("문의사항 데이터를 불러오는데 실패했습니다.", error);
    throw new Error("문의사항 데이터를 불러오는데 실패했습니다.");
  }
}

// 개선의견 데이터
export const getOpinionData = async () => {
  try {
    await checkAdminAuth();

    const opinionSnapshot = await getDocs(collection(db, "opinion"));
    
    if (opinionSnapshot.empty) {
      return [];
    }

    return opinionSnapshot.docs.map(doc => ({
      id: doc.id,
      opinion: doc.data().opinion,
      userName: doc.data().userName,
      userEmail: doc.data().userEmail,
      userImage: doc.data().userImage,
      createdAt: formatDate(new Date(doc.data().createdAt))
    }));
  } catch (error) {
    console.error("개선의견 데이터를 불러오는데 실패했습니다.", error);
    throw new Error("개선의견 데이터를 불러오는데 실패했습니다.");
  }
}
