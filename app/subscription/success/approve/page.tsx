"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

const SubscriptionApprove = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5">
    <div className="flex flex-col space-y-2 items-center">
      <Image src="/subscribeSuccess.png" alt="구독 성공" width={64} height={64} />
      <h1 className="text-3xl font-semibold">구독해주셔서 감사합니다!</h1>
      <p>발전하는 서비스로 공인중개사 여러분과 함께 하겠습니다.</p>
      <button onClick={() => router.push("/")} className="bg-green-500 hover:bg-green-600 text-white  px-5 py-2 rounded-md text-center transition-colors">메인으로 돌아가기</button>
    </div>
  </div>
  );
}

export default SubscriptionApprove;