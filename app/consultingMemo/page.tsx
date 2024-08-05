"use client";

import MemoTable from "@/components/consultingMemo/MemoTable";
import SubscriptionMessage from "@/lib/SubscriptionMessage";
import { getTid } from "@/lib/subscriptionUtils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
      const getCount = async () => {
        try {
          const response = await axios.get("/api/consultingMemo/memoCount");
  
          if (response.status === 200) {
            setFreeUse(response.data);
          }
        } catch (error) {
          console.error("중개메모 getCount에서 오류 발생", error);
          if (axios.isAxiosError(error)) {
            return toast("오류 발생", {
              description: error.response?.data,
            });
          }
        }
      };
  
      getCount();
    }
  }, []);

  // 결제 조회
  useEffect(() => {
    if (session) {
      const userPayment = async () => {
        const tid = await getTid();
        try {
          const response = await axios.post("/api/kakaoPay/userPayment", {
            tid,
          });
  
          if (response.status === 200) {
            setSubscribe(response.data);
          }
        } catch (error) {
          console.error("MySubscription POST에서 오류 발생", error);
        }
      };
  
      userPayment();
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
          <h2 className="text-lg">중개메모 목록</h2>
        )}
      </div>
      <MemoTable freeUse={freeUse} />
    </div>
  );
};

export default ConsultingMemo;
