"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { INote } from "@/types/consultingNote";

export const getNote = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: "로그인이 필요한 서비스입니다." };
  }

  if (!id) {
    return { error: "게시글 주소가 올바르지 않습니다." };
  }

  try {
    const docRef = doc(db, "consultingNote", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id } as INote;
    } else {
      return { error: "게시글이 존재하지 않습니다." };
    }
  } catch (error) {
    console.error("consultiongNote GET API에서 오류 발생", error);
    return { error: "오류가 발생하였으니 새로고침해주세요." };
  }
};
