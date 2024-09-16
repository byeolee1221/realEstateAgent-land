"use client";

import PlanCancel from "@/components/subscription/PlanCancel";
import { Skeleton } from "@/components/ui/skeleton";
import { getSid, getTid } from "@/lib/subscriptionUtils";
import { formatDate } from "@/lib/utils";
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
  const [tid, setTid] = useState<string | undefined>("");
  const [sid, setSid] = useState<string | undefined>("");
  const [payment, setPayment] = useState<IPayment>();
  const [paymentDate, setPaymentDate] = useState<IPaymentDate>();
  const [isLoading, setLoading] = useState(false);

  const lastPaymentDate = paymentDate?.approvedAt.split("T")[0];

  // 현재시각 형식 맞추는 코드
  const currentDate = new Date();
  const formattedCurrentDate = formatDate(currentDate);

  // 조건부 코드
  useEffect(() => {
    if (!payment?.status) {
      setStatusMsg("구독정보를 불러오고 있습니다.");
      return;
    }

    if (payment.status === "SUCCESS_PAYMENT") {
      setStatusMsg("현재 스탠다드플랜을 구독중입니다.");
    } else if (payment.status === "FAIL_PAYMENT" || payment.status === "CANCEL_PAYMENT") {
      setStatusMsg("구독중인 상품이 없습니다.");
    }
  }, [payment]);

  // DB에서 tid, sid 값 가져오기
  useEffect(() => {
    const getData = async () => {
      try {
        const [tid, sid] = await Promise.all([
          getTid(),
          getSid()
        ]);

        setTid(tid);
        setSid(sid);
      } catch (error) {
        console.error("mySubscription 구독정보 GET에서 오류 발생", error);
      }
    };

    getData();
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
    };

    getApprovedDate();
  }, []);

  // 결제 조회
  useEffect(() => {
    const userPayment = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/kakaoPay/userPayment", {
          tid,
        });

        if (response.status === 200) {
          setPayment(response.data);
        }
      } catch (error) {
        console.error("MySubscription POST에서 API 오류 발생", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        } else {
          console.error("MySubscription POST에서 서버 오류 발생", error);
          setError("서버에서 오류가 발생하였으니 잠시 후 새로고침 해주세요.");
        }
      } finally {
        setLoading(false);
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
  }, [sid, formattedCurrentDate]);

  const dataArr = [
    { id: 1, title: "구독일", data: lastPaymentDate },
    { id: 2, title: "정기결제 금액", data: `${payment?.amount.toLocaleString("ko-KR")}원` },
    { id: 3, title: "다음 결제일", data: paymentDate?.formattedNextDate },
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
            {statusMsg}
          </span>
        </div>
      </div>
      {!isLoading ? (
        !error ? (
          payment?.status === "SUCCESS_PAYMENT" ? (
            <div className="bg-slate-100 flex flex-col rounded-md px-4 py-5 space-y-3 text-sm shadow-sm">
              <h2 className="font-semibold text-lg">구독 정보</h2>
              {dataArr.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <h3>{item.title}</h3>
                  <span>{item.data}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-100 rounded-md px-4 py-5 space-y-3 shadow-sm">
                <h2 className="text-center">
                  {payment?.status !== undefined ? "현재 구독하신 상품이 없습니다." : "구독정보를 불러오고 있습니다."}
              </h2>
            </div>
          )
        ) : (
          <div className="bg-slate-100 rounded-md px-4 py-5 space-y-3 shadow-sm">
            <h2 className="text-center">{error}</h2>
          </div>
        )
      ) : (
        <Skeleton className="h-[164px] w-full rounded-md bg-slate-100 shadow-sm" />
      )}
      {payment?.status === "SUCCESS_PAYMENT" ? <PlanCancel tid={tid} /> : null}
    </div>
  );
};

export default MySubscription;
