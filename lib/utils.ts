import { ISubscribe } from "@/app/consultingNote/page";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { getTid } from "./subscriptionUtils";
import { INote } from "@/app/consultingNote/[id]/page";
import { IMemo } from "@/app/consultingMemo/[id]/page";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 무료사용횟수 조회
export const getCount = async (
  title: string,
  apiUrl: string,
  setFreeUse: (value: number) => void
) => {
  try {
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      setFreeUse(response.data);
    }
  } catch (error) {
    console.error(`${title} getCount에서 오류 발생`, error);
    if (axios.isAxiosError(error)) {
      return toast("오류 발생", {
        description: error.response?.data,
      });
    }
  }
};

// 유저의 구독상태 가져오기
export const userPayment = async (
  title: string,
  apiUrl: string,
  setSubscribe: (value: ISubscribe) => void
) => {
  const tid = await getTid();
  try {
    const response = await axios.post(apiUrl, {
      tid,
    });

    if (response.status === 200) {
      setSubscribe(response.data);
    }
  } catch (error) {
    console.error(`${title} userPayment POST에서 오류 발생`, error);
  }
};

// 상담노트 또는 중개메모 상세데이터 가져오기
type NoteOrMemo<T> = T extends "상담노트" ? INote : IMemo;

export const getPost = async <T extends "상담노트" | "중개메모">(
  title: T,
  apiUrl: string,
  setPost: (value: NoteOrMemo<T>) => void
) => {
  try {
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      setPost(response.data);
    }
  } catch (error) {
    console.error(`${title} getPost GET에서 오류 발생`, error);
    if (axios.isAxiosError(error)) {
      return toast("오류 발생", {
        description: error.response?.data,
      });
    }
  }
};
