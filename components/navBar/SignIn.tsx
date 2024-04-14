"use client"

import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const onSignIn = () => {
    signIn("google");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
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
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
          <span>로그인</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>중개랜드 로그인</DialogTitle>
          <DialogDescription>아래 방법으로 로그인할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <button onClick={onSignIn} className="flex items-center space-x-10 rounded-md border-2 px-3 py-2 w-full">
            <Image src="/g-logo.png" alt="구글" width={30} height={30} className="rounded-full" />
            <span>구글로 로그인하기</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
