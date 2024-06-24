"use client"

import UserOpinion from "@/components/subscription/UserOpinion";
import Image from "next/image";

const PaymentCancel = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5">
      <div className="flex flex-col space-y-2 items-center">
        <Image src="/subscribeSuccess.png" alt="구독 취소" width={64} height={64} />
        <h1 className="text-3xl font-semibold">구독이 취소되었습니다.</h1>
        <p>더 나은 서비스를 위해 노력하겠습니다. 감사합니다.</p>
      </div>
      <UserOpinion />
    </div>
  );
};

export default PaymentCancel;
