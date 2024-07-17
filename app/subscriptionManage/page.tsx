"use client"

import SubscriptionList from "@/components/subscriptionManage/SubscriptionList";
import Image from "next/image";

const SubscriptionManage = () => {
  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm px-5">
        <Image src="/subscriptionIcon.png" alt="구독" width={30} height={30} />
        <h2 className="text-lg font-semibold">회원 구독관리</h2>
      </div>
      <SubscriptionList />
    </div>
  );
}

export default SubscriptionManage;