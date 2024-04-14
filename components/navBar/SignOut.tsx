"use client";

import { signOut } from "next-auth/react";
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
import { DropdownMenuItem } from "../ui/dropdown-menu";

const SignOut = () => {
  const onSignOut = () => {
    signOut();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full">
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
            <span>로그아웃</span>
          </DropdownMenuItem>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[95%] rounded-xl">
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>정말 로그아웃하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            로그아웃 하시려면 아래 확인버튼을 눌러주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onSignOut}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignOut;
