"use client";

import PlanCancel from "@/components/subscription/PlanCancel";
import { getTidState } from "@/lib/selectorState";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface IPayment {
  status: string;
  itemName: string;
  approvedAt: string;
  amount: number;
}

const MySubscription = () => {
  const { data: session } = useSession();
  const [error, setError] = useState();
  const [payment, setPayment] = useState<IPayment>();

  const tid = useRecoilValue(getTidState);
  const date = payment?.approvedAt.split("T")[0];
  
  const approvedDate = new Date(payment?.approvedAt!);
  const nextPaymentDate = `${approvedDate.getFullYear()}-${(approvedDate.getMonth() + 2).toString().padStart(2, "0")}-${approvedDate.getDate()}`;

  useEffect(() => {
    const userPayment = async () => {
      try {
        const response = await axios.post("/api/kakaoPay/userPayment", {
          tid,
        });

        if (response.status === 200) {
          setPayment(response.data);
        }
      } catch (error: any) {
        console.error("MySubscription POST에서 오류 발생", error);
        setError(error.response.data);
      }
    };

    userPayment();
  }, []);

  const dataArr = [
    { title: "가입일", data: date },
    { title: "정기결제 금액", data: `${payment?.amount}원` },
    { title: "다음 결제일", data: nextPaymentDate },
  ];

  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm">
        <Image src="/subscriptionIcon.png" alt="구독" width={40} height={40} />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">
            {session ? `${session.user?.name}님 구독관리` : "내 구독관리"}
          </h2>
          <span className="text-sm">
            {payment?.itemName === "중개랜드 스탠다드구독"
              ? "현재 스탠다드플랜을 구독중입니다."
              : "구독중인 상품이 없습니다."}
          </span>
        </div>
      </div>
      {!error ? <div className="bg-slate-100 flex flex-col rounded-md px-4 py-5 space-y-3 text-sm shadow-sm">
        <h2 className="font-semibold text-lg">구독 정보</h2>
        {dataArr.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <h3>{item.title}</h3>
            <span>{item.data}</span>
          </div>
        ))}
      </div> : null}
      <PlanCancel tid={tid} />
    </div>
  );
};

export default MySubscription;
