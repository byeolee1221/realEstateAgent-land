"use client";

import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const SubscribeAlert = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/subscription");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md text-white w-1/3 text-center">
          노트 만들기
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[95%] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>무료사용이 만료되었습니다.</AlertDialogTitle>
          <AlertDialogDescription>
            확인을 누르면 구독에 관한 설명이 있는 페이지로 이동됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>이동</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubscribeAlert;
