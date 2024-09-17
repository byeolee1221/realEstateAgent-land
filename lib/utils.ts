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
    console.error(`${title} getCount에서 API 오류 발생`, error);
    if (axios.isAxiosError(error)) {
      return toast("오류 발생", {
        description: error.response?.data,
      });
    } else {
      console.error(`${title} getCount에서 서버 오류 발생`, error);
      return toast("서버 오류 발생", {
        description: "서버에서 오류가 발생하였으니 잠시 후 새로고침 해주세요.",
      });
    }
  }
};

// 유저의 결제정보 가져오기
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
    console.error(`${title} userPayment POST에서 API 오류 발생`, error);
    if (axios.isAxiosError(error)) {
      return toast("오류 발생", {
        description: error.response?.data,
      });
    } else {
      console.error(`${title} userPayment POST에서 서버 오류 발생`, error);
      return toast("서버 오류 발생", {
        description: "서버에서 오류가 발생하였으니 잠시 후 새로고침 해주세요.",
      });
    }
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
    console.error(`${title} getPost GET에서 API 오류 발생`, error);
    if (axios.isAxiosError(error)) {
      return toast("오류 발생", {
        description: error.response?.data,
      });
    } else {
      console.error(`${title} getPost GET에서 서버 오류 발생`, error);
      return toast("서버 오류 발생", {
        description: "서버에서 오류가 발생하였으니 잠시 후 새로고침 해주세요.",
      });
    }
  }
};

// 날짜 포맷 (며칠을 더해야 하는 날짜라면 미리 세팅해서 보낼 것)
export const formatDate = (beforeDate: Date, addMonths: number = 0) => {
  const year = beforeDate.getFullYear();
  const month = beforeDate.getMonth() + 1 + addMonths;  // 현재 월에 추가할 개월 수를 더함
  const adjustedYear = month > 12 ? year + 1 : year;  // 12월을 넘어가면 연도 증가
  const adjustedMonth = month > 12 ? month - 12 : month;  // 12월을 넘어가면 1월로 조정

  const formattedMonth = String(adjustedMonth).padStart(2, "0");
  const date = String(beforeDate.getDate()).padStart(2, "0");

  return `${adjustedYear}-${formattedMonth}-${date}`;
};