"use client";

import MemoTable from "@/components/consultingMemo/MemoTable";
import { getPaymentDate, getTid } from "@/lib/subscriptionUtils";
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

  const [nextPayment, setNextPayment] = useState<string | undefined>("");
  const [freeUse, setFreeUse] = useState(5);
  const [message, setMessage] = useState("");
  const [subscribe, setSubscribe] = useState<ISubscribe>();

  // 유틸리티 함수에서 다음 결제일 가져오기 
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const nextPaymentDate = await getPaymentDate();

        setNextPayment(nextPaymentDate?.nextPaymentDate);
      } catch (error) {
        console.error("consultingMemo fetchSubscriptionData에서 오류 발생", error);
      }
    };

    fetchSubscriptionData();
  }, []);

  // 구독해지 시 다음 결제일까지 이용할 수 있도록 설정
  useEffect(() => {
    if (subscribe?.status !== "SUCCESS_PAYMENT" && freeUse !== 0) {
      setMessage(`무료사용가능 횟수: ${freeUse}회`);
    } else if (subscribe?.status !== "SUCCESS_PAYMENT" && freeUse === 0) {
      setMessage("무료사용이 만료되었습니다.");
    } else if (subscribe?.status === "CANCEL_PAYMENT" && nextPayment !== "") {
      setMessage(`${nextPayment}까지 구독혜택이 지속됩니다.`);
    } else {
      setMessage(`${subscribe?.itemName}을 이용중입니다.`);
    }
  }, [subscribe]);

  // 중개메모 무료사용횟수 조회
  useEffect(() => {
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
  }, []);

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

    userPayment();
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
            <p className="text-xs">{message}</p>
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
