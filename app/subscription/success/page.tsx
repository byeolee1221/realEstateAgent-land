"use client"

import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// 정기결제 ready 통과 후 표출 페이지

const SubscriptionSuccess = () => {
  const query = useSearchParams();
  const pgToken = query.get("pg_token");
  
  const router = useRouter();

  // approve api 호출
  useEffect(() => {
    const approveRequest = async () => {
      try {
        const response = await axios.post("/api/kakaoPay/approve", {
          pgToken,
        });

        if (response.status === 200) {
          router.push("/subscription/success/approve");
        }
      } catch (error) {
        console.error("approve post에서 API 오류 발생", error);
        if (axios.isAxiosError(error)) {
          alert(error.response?.data);
        } else {
          console.error("approve post에서 서버 오류 발생", error);
          alert("서버에서 오류가 발생하여 결제가 되지 않았습니다. 잠시 후 다시 시도해주세요.");
        }
      }
    }

    approveRequest();
  }, [pgToken]);

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