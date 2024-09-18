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
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

interface IProps {
  isDesktop?: boolean;
}

const SignOut = ({ isDesktop }: IProps) => {
  const onSignOut = () => {
    signOut();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {!isDesktop ? (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6 mr-2" />
            <span>로그아웃</span>
          </DropdownMenuItem>
        ) : (
          <button className="text-lg font-bold">로그아웃</button>
        )}
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
