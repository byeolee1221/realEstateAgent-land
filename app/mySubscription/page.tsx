"use client";

import PlanCancel from "@/components/subscription/PlanCancel";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IPayment {
  status: string;
  itemName: string;
  approvedAt: string;
  amount: number;
}

const MySubscription = () => {
  const { data: session } = useSession();
  const [error, setError] = useState();
  const [statusMsg, setStatusMsg] = useState("");
  const [tid, setTid] = useState("");
  const [payment, setPayment] = useState<IPayment>();

  const date = payment?.approvedAt.split("T")[0];

  // 표시될 승인시각, 현재시각 형식 맞추는 코드
  const approvedDate = new Date(payment?.approvedAt!);
  const nextPaymentDate = `${approvedDate.getFullYear()}-${(approvedDate.getMonth() + 2)
    .toString()
    .padStart(2, "0")}-${approvedDate.getDate()}`;
  const currentDate = new Date();
  const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${currentDate.getDate()}`;
  // console.log(formattedCurrentDate)

  // 조건부 코드
  useEffect(() => {
    if (payment?.status === "SUCCESS_PAYMENT") {
      setStatusMsg("현재 스탠다드플랜을 구독중입니다.");
    } else if (payment?.status === "FAIL_PAYMENT" || payment?.status === "CANCEL_PAYMENT") {
      setStatusMsg("구독중인 상품이 없습니다.");
    }
  }, [payment]);


  // DB에서 tid 값 가져오기
  useEffect(() => {
    const getTid = async () => {
      try {
        const response = await axios.get("/api/kakaoPay/userPayment");

        if (response.status === 200) {
          setTid(response.data);
        }
      } catch (error: any) {
        console.error("mySubscription 구독정보 GET에서 오류 발생", error);
      }
    }

    getTid();
  }, [])

  // 결제 조회
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

  // 2회차 이상 자동 결제 호출
  useEffect(() => {
    const interval = setInterval(() => {
      if (nextPaymentDate === formattedCurrentDate) {
        const regularPayment = async () => {
          try {
            const response = await axios.post("/api/kakaoPay/regularPayment", {
              // sid
            });

            if (response.status === 200) {
              console.log("정기결제 성공");
            }
          } catch (error: any) {
            console.error("mySubscription 정기결제 POST에서 오류 발생", error);
          }
        };

        regularPayment();
      }
    }, 1000);

    return () => clearInterval(interval);
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
            {payment?.itemName === "중개랜드 스탠다드구독" && <p>{statusMsg}</p>}
          </span>
        </div>
      </div>
      {!error ? (
        payment?.status === "SUCCESS_PAYMENT" ? (
          <div className="bg-slate-100 flex flex-col rounded-md px-4 py-5 space-y-3 text-sm shadow-sm">
            <h2 className="font-semibold text-lg">구독 정보</h2>
            {dataArr.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <h3>{item.title}</h3>
                <span>{item.data}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-100 rounded-md px-4 py-5 space-y-3 shadow-sm">
            <h2 className="text-center">현재 구독하신 상품이 없습니다.</h2>
          </div>
        )
      ) : (
        <div className="bg-slate-100 rounded-md px-4 py-5 space-y-3 shadow-sm">
          <h2 className="text-center">{error}</h2>
        </div>
      )}
      {payment?.status === "SUCCESS_PAYMENT" ? <PlanCancel tid={tid} /> : null}
    </div>
  );
};

export default MySubscription;
