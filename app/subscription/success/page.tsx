"use client"

import { tidState } from "@/lib/atomState";
import { getTidState } from "@/lib/selectorState";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// 정기결제 ready 통과 후 표출 페이지

const SubscriptionSuccess = () => {
  const query = useSearchParams();
  const pgToken = query.get("pg_token");
  
  const router = useRouter();

  const tid = useRecoilValue(getTidState);
  const [newTid, setNewTid] = useRecoilState(tidState);

  // approve api 호출
  useEffect(() => {
    const approveRequest = async () => {
      try {
        const response = await axios.post("/api/kakaoPay/approve", {
          pgToken,
          tid
        });

        if (response.status === 200) {
          console.log("정기결제 승인 완료");
          setNewTid("");

          router.push("/subscription/success/approve");
        }
      } catch (error: any) {
        console.error("approve post에서 오류 발생", error);
        alert(error.response.data);
      }
    }

    approveRequest();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5">
      <div className="flex flex-col space-y-2 items-center">
        <Image src="/subscribeSuccess.png" alt="구독 승인" width={64} height={64} />
        <h1 className="text-3xl font-semibold">결제 진행중입니다.</h1>
        <p>잠시만 기다려주세요!</p>
      </div>
    </div>
  );
}

export default SubscriptionSuccess;