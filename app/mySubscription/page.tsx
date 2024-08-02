"use client";

import PlanCancel from "@/components/subscription/PlanCancel";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IPayment {
  status: string;
  itemName: string;
  amount: number;
}

interface IPaymentDate {
  approvedAt: string;
  formattedNextDate: string;
}

const MySubscription = () => {
  const { data: session } = useSession();

  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [tid, setTid] = useState("");
  const [sid, setSid] = useState("");
  const [payment, setPayment] = useState<IPayment>();
  const [paymentDate, setPaymentDate] = useState<IPaymentDate>();

  const lastPaymentDate = paymentDate?.approvedAt.split("T")[0];

  // 현재시각 형식 맞추는 코드
  const currentDate = new Date();
  const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  // 조건부 코드
  useEffect(() => {
    if (payment?.status === "SUCCESS_PAYMENT") {
      setStatusMsg("현재 스탠다드플랜을 구독중입니다.");
    } else if (payment?.status === "FAIL_PAYMENT" || payment?.status === "CANCEL_PAYMENT") {
      setStatusMsg("구독중인 상품이 없습니다.");
    }
  }, [payment]);

  // DB에서 tid, sid 값 가져오기
  useEffect(() => {
    const getTid = async () => {
      try {
        const response = await axios.get("/api/kakaoPay/approve");

        if (response.status === 200) {
          setTid(response.data.tid);
          setSid(response.data.sid);
        }
      } catch (error) {
        console.error("mySubscription 구독정보 GET에서 오류 발생", error);
      }
    };

    getTid();
  }, []);

  // 구독 결제일 정보 가져오기
  useEffect(() => {
    const getApprovedDate = async () => {
      try {
        const response = await axios.get("/api/subscriptionUpdateInfo");

        if (response.status === 200) {
          setPaymentDate(response.data);
        }
      } catch (error) {
        console.error("MySubscription getApprovedDate에서 오류 발생", error);
      }
    }

    getApprovedDate();
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
      } catch (error) {
        console.error("MySubscription POST에서 오류 발생", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        }
      }
    };

    // tid값을 불러오기 전에 userPayment 함수가 끝나서 데이터 표시를 못하는 경우를 방지하기 위해 조건문 추가
    if (tid) {
      userPayment();
    }
  }, [tid]);

  // 2회차 이상 자동 결제 호출 (스케쥴러 사용 예정)
  useEffect(() => {
    if (paymentDate?.formattedNextDate === formattedCurrentDate) {
      const regularPayment = async () => {
        try {
          const response = await axios.post("/api/kakaoPay/regularPayment", {
            sid,
          });

          if (response.status === 200) {
            console.log("정기결제 성공");
          }
        } catch (error) {
          console.error("mySubscription 정기결제 POST에서 오류 발생", error);
        }
      };

      if (sid) {
        regularPayment();
      }
    }
  }, [sid]);

  const dataArr = [
    { title: "구독일", data: lastPaymentDate },
    { title: "정기결제 금액", data: `${payment?.amount}원` },
    { title: "다음 결제일", data: paymentDate?.formattedNextDate },
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
