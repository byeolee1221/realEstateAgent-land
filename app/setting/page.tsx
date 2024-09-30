"use client";

import NavBar from "@/components/navBar/NavBar";
import AccountDisconnect from "@/components/setting/AccountDisconnect";
import AdminMenu from "@/components/setting/AdminMenu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoonIcon,
  SunIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  BellIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const Setting = () => {
  const { data: session } = useSession();
  const { setTheme } = useTheme();

  return (
    <NavBar>
      <div className="flex flex-col space-y-6 px-4 pt-20 pb-10 lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-8">
        <div className="bg-slate-100 px-4 py-2 flex items-center space-x-2 rounded-md shadow-sm lg:flex-col lg:space-x-0 lg:space-y-2 lg:items-start lg:py-4">
          <h2 className="hidden text-sm font-semibold lg:block">사용자 정보</h2>
          <div className="flex items-center space-x-2">
            {session ? (
              <img src={session.user?.image!} alt="프로필" className="w-10 h-10 rounded-sm" />
            ) : (
              <Image
                src="/user.png"
                alt="프로필"
                width={40}
                height={40}
                className="bg-slate-300 rounded-full p-1"
              />
            )}
            {session ? (
              <div className="flex flex-col text-sm">
                <h1 className="font-bold">{session.user?.name}</h1>
                <p>{session.user?.email}</p>
              </div>
            ) : (
              <h2>로그인이 필요한 서비스입니다.</h2>
            )}
          </div>
        </div>
        <div className="bg-slate-100 flex flex-col rounded-md px-4 py-5 space-y-3 text-sm shadow-sm">
          <h2 className="font-semibold text-sm">사이트 메뉴</h2>
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center space-x-2">
              <MoonIcon className="w-5 h-5" />
              <span>테마 설정</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">테마 선택</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>라이트 모드</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>다크 모드</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>기기 설정</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-between border-b pb-2">
            <Link href="/notice" className="flex items-center space-x-2 w-full">
              <InformationCircleIcon className="w-5 h-5" />
              <span>공지사항</span>
            </Link>
            <ChevronRightIcon className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-between">
            <Link href="/useTerms" className="flex items-center space-x-2 w-full">
              <BellIcon className="w-5 h-5" />
              <span>서비스 이용약관</span>
            </Link>
            <ChevronRightIcon className="w-6 h-6" />
          </div>
        </div>
        {session ? (
          <div className="bg-slate-100 flex flex-col rounded-md px-4 py-5 space-y-3 text-sm shadow-sm">
            <h2 className="font-semibold text-sm">계정 설정</h2>
            <div className="flex items-center justify-between border-b pb-2 w-full">
              <AccountDisconnect />
              <ChevronRightIcon className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between pb-2 w-full">
              <Link href="/mySubscription" className="flex items-center space-x-2 w-full">
                <BookmarkIcon className="w-5 h-5" />
                <span>구독관리</span>
              </Link>
              <ChevronRightIcon className="w-6 h-6" />
            </div>
          </div>
        ) : null}
        <AdminMenu />
      </div>
    </NavBar>
  );
};

export default Setting;
