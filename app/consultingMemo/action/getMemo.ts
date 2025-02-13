"use server";

import { db } from "@/app/firebase";
import { IMemo } from "@/types/consultingMemo";
import { getDoc } from "firebase/firestore";
import { authOptions } from "@/lib/auth";
import { doc } from "firebase/firestore";
import { getServerSession } from "next-auth";

export const getMemo = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "로그인이 필요한 서비스입니다." };
  }

  if (!id) {
    return { error: "게시글 주소가 올바르지 않습니다." };
  }

  try {
    const docRef = doc(db, "consultingMemo", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as IMemo;
    } else {
      return { error: "게시글이 존재하지 않습니다." };
    }
  } catch (error) {
    console.error("consultingMemo GET API에서 오류 발생", error);
    return { error: "오류가 발생하였으니 새로고침해주세요." };
  }
};

