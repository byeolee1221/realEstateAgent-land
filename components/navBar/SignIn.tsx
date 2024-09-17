"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { signIn } from "next-auth/react";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

interface IProps {
  isDesktop?: boolean;
}

const SignIn = ({ isDesktop }: IProps) => {
  const onSignIn = () => {
    signIn("google");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!isDesktop ? (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ArrowLeftEndOnRectangleIcon className="w-6 h-6 mr-2" />
            <span>로그인</span>
          </DropdownMenuItem>
        ) : (
          <button className="text-lg font-bold">로그인</button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>중개랜드 로그인</DialogTitle>
          <DialogDescription>아래 방법으로 로그인할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={onSignIn}
            className="flex items-center justify-center space-x-2 rounded-md border-2 px-3 py-2 w-full"
          >
            <Image src="/g-logo.png" alt="구글" width={30} height={30} className="rounded-full" />
            <span>구글로 로그인하기</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
