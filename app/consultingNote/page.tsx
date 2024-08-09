"use client";

import NoteTable from "@/components/consultingNote/NoteTable";
import NavBar from "@/components/navBar/NavBar";
import SubscriptionMessage from "@/lib/SubscriptionMessage";
import { getCount, userPayment } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface ISubscribe {
  status: string;
  itemName: string;
}

const ConsultingNote = () => {
  const { data: session } = useSession();

  const [freeUse, setFreeUse] = useState<number>();
  const [subscribe, setSubscribe] = useState<ISubscribe>();

  // 상담노트 무료사용횟수 조회
  useEffect(() => {
    if (session) {
      getCount("상담노트", "/api/consultingNote/noteCount", setFreeUse);
    }
  }, []);

  // 결제 조회
  useEffect(() => {
    if (session) {
      userPayment("상담노트", "/api/kakaoPay/userPayment", setSubscribe);
    }
  }, []);

  return (
    <NavBar>
      <div className="px-4 flex flex-col space-y-6">
        <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm">
          <Image src="/memo.png" alt="메모" width={30} height={30} />
          {session ? (
            <div className="flex flex-col">
              <h2 className="text-lg">
                <span className="font-semibold">{session.user?.name}</span>
                님의 상담노트 목록
              </h2>
              <SubscriptionMessage subscribe={subscribe} />
            </div>
          ) : (
            <h2 className="text-lg font-semibold">상담노트 목록</h2>
          )}
        </div>
        <NoteTable freeUse={freeUse} />
      </div>
    </NavBar>
  );
};

export default ConsultingNote;
