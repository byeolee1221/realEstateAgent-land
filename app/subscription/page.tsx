"use client";

import PaymentApprove from "@/components/subscription/PaymentApprove";
import PaymentInfo from "@/components/subscription/PaymentInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { getApproveState } from "@/lib/selectorState";
import { getTid } from "@/lib/subscriptionUtils";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";

interface ISubscribe {
  status: string;
  itemName: string;
}

const Subscription = () => {
  const { data: session } = useSession();
  const approve = useRecoilValue(getApproveState);
  const [subscribe, setSubscribe] = useState<ISubscribe>();
  const [isLoading, setLoading] = useState(false);

  const standardArr = ["상담노트 및 중개메모 무제한 사용 가능", "추후 추가될 새 기능 중의 일부"];

  const item_name = "스탠다드";
  const amount = 10000;

  // ready api 호출
  const onSubscribe = async () => {
    try {
      const response = await axios.post("/api/kakaoPay", {
        item_name,
        amount,
      });

      if (response.status === 200) {
        window.open(response.data.next_redirect_pc_url);
      }
    } catch (error) {
      console.error("subscription POST에서 오류 발생", error);
      if (axios.isAxiosError(error)) {
        return toast("오류 발생", {
          description: error.response?.data,
        });
      }
    }
  };

  // 결제 조회
  useEffect(() => {
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

    if (session) {
      userPayment();
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      if (!subscribe) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [subscribe, session]);

  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm px-5">
        <Image src="/subscriptionIcon.png" alt="구독" width={30} height={30} />
        <h2 className="text-lg font-semibold">구독 안내</h2>
      </div>
      <div className="bg-yellow-100 rounded-md flex flex-col space-y-2 p-4 border-2 border-transparent hover:border-yellow-200 shadow-md transition-colors">
        <h2 className="text-xl font-semibold">스탠다드</h2>
        <p>중개랜드에서 현재 운영중인 기본적인 구독방식입니다.</p>
        <h3 className="text-3xl font-semibold">10,000원 /월</h3>
        <div className="flex flex-col space-y-1">
          <h3>스탠다드 내용</h3>
          {standardArr.map((item, i) => (
            <div key={i} className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
        {subscribe?.status !== "SUCCESS_PAYMENT" ? (
          isLoading ? (
            <Skeleton className="h-4 w-full rounded-xl bg-orange-200" />
          ) : (
            <PaymentApprove />
          )
        ) : null}
        {!isLoading ? (
          <button
          onClick={onSubscribe}
          className={cn(
            "text-white px-3 py-2 rounded-md transition-colors",
            !approve || !session ? "bg-orange-200" : "bg-orange-500 hover:bg-orange-600"
          )}
          disabled={!approve || subscribe?.status === "SUCCESS_PAYMENT" || !session}
        >
          {subscribe?.status !== "SUCCESS_PAYMENT" ? "선택" : "이미 구독중입니다."}
        </button>
        ) : (
            <Skeleton className="h-10 bg-orange-200 w-full" />
        )}
      </div>
      <PaymentInfo />
    </div>
  );
};

export default Subscription;
