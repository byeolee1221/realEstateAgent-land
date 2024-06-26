"use client"

import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// 정기결제 ready 통과 후 표출 페이지

const SubscriptionSuccess = () => {
  const query = useSearchParams();
  const pgToken = query.get("pg_token");

  const [tid, setTid] = useState("");
  
  const router = useRouter();

  // tid 값 가져오기
  useEffect(() => {
    const getTid = async () => {
      try {
        const response = await axios.get("/api/kakaoPay/approve");

        if (response.status === 200) {
          setTid(response.data);
        }
      } catch (error: any) {
        console.error("mySubscription 구독정보 GET에서 오류 발생", error);
      }
    }

    getTid();
  }, [])

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