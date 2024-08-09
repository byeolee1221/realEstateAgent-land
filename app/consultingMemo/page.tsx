"use client";

import MemoTable from "@/components/consultingMemo/MemoTable";
import SubscriptionMessage from "@/lib/SubscriptionMessage";
import { getCount, userPayment } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ISubscribe {
  status: string;
  itemName: string;
}

const ConsultingMemo = () => {
  const { data: session } = useSession();

  const [freeUse, setFreeUse] = useState<number>();
  const [subscribe, setSubscribe] = useState<ISubscribe>();

  // 중개메모 무료사용횟수 조회
  useEffect(() => {
    if (session) {
      getCount("중개메모", "/api/consultingMemo/memoCount", setFreeUse);
    }
  }, []);

  // 결제 조회
  useEffect(() => {
    if (session) {
      userPayment("중개메모", "/api/kakaoPay/userPayment", setSubscribe);
    }
  }, []);

  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm">
        <Image src="/memo2.png" alt="게시" width={30} height={30} />
        {session ? (
          <div className="flex flex-col">
            <h2 className="text-lg">
              <span className="font-semibold">{session.user?.name}</span>
              님의 중개메모 목록
            </h2>
            <SubscriptionMessage subscribe={subscribe} />
          </div>
        ) : (
          <h2 className="text-lg font-semibold">중개메모 목록</h2>
        )}
      </div>
      <MemoTable freeUse={freeUse} />
    </div>
  );
};

export default ConsultingMemo;
