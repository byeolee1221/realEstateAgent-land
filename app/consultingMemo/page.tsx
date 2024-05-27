"use client";

import MemoTable from "@/components/consultingMemo/MemoTable";
import NavBar from "@/components/navBar/NavBar";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ConsultingMemo = () => {
  const { data: session } = useSession();

  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/consultingMemo.jpg')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
            중개메모
          </h1>
          <p>My consulting memo</p>
        </div>
        <div className="px-4 flex flex-col space-y-6">
          <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm">
            <Image src="/memo2.png" alt="게시" width={30} height={30} />
            {session ? (
              <div className="flex flex-col">
                <h2 className="text-lg">
                  <span className="font-semibold">{session.user?.name}</span>
                  님의 중개메모 목록
                </h2>
                <p className="text-xs">무료사용가능 횟수: 5회</p>
              </div>
            ) : (
              <h2 className="text-lg">
                중개메모 목록
              </h2>
            )}
          </div>
          <MemoTable />
        </div>
      </div>
    </NavBar>
  );
};

export default ConsultingMemo;
