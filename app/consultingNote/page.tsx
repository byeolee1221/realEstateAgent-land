"use client";

import NoteTable from "@/components/consultingNote/NoteTable";
import NavBar from "@/components/navBar/NavBar";
import { getPaymentDate, getTid } from "@/lib/subscriptionUtils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ISubscribe {
  status: string;
  itemName: string;
}

const ConsultingNote = () => {
  const { data: session } = useSession();

  const [nextPayment, setNextPayment] = useState<string | undefined>("");
  const [freeUse, setFreeUse] = useState(1);
  const [message, setMessage] = useState("");
  const [subscribe, setSubscribe] = useState<ISubscribe>();

  // 유틸리티 함수에서 다음 결제일 가져오기
  useEffect(() => {
    if (session) {
      const fetchSubscriptionData = async () => {
        try {
          const nextPaymentDate = await getPaymentDate();

          setNextPayment(nextPaymentDate?.nextPaymentDate);
        } catch (error) {
          console.error("consultingNote fetchSubscriptionData에서 오류 발생", error);
        }
      };

      fetchSubscriptionData();
    }
  }, []);

  // 구독상태에 따른 메세지 출력
  useEffect(() => {
    if (subscribe) {
      if (subscribe.status === "CANCEL_PAYMENT" && nextPayment) {
        setMessage(`${nextPayment}까지 구독혜택이 지속됩니다.`);
      } else if (subscribe.status === "SUCCESS_PAYMENT") {
        setMessage(`${subscribe.itemName}을 이용중입니다.`);
      } 
    } else {
      setMessage("구독정보를 가져오고 있습니다.");
    }
  }, [subscribe, nextPayment]);

  // 상담노트 무료사용횟수 조회
  useEffect(() => {
    if (session) {
      const getCount = async () => {
        try {
          const response = await axios.get("/api/consultingNote/noteCount");

          if (response.status === 200) {
            setFreeUse(response.data);
          }
        } catch (error) {
          console.error("상담노트 getCount에서 오류 발생", error);
          if (axios.isAxiosError(error)) {
            return toast("오류 발생", {
              description: error.response?.data,
            });
          }
        }
      };

      getCount();
    }
  }, []);

  // 결제 조회
  useEffect(() => {
    if (session) {
      const userPayment = async () => {
        const tid = await getTid();
        try {
          const response = await axios.post("/api/kakaoPay/userPayment", {
            tid,
          });

          if (response.status === 200) {
            setSubscribe(response.data);
          }
        } catch (error) {
          console.error("MySubscription POST에서 오류 발생", error);
        }
      };

      userPayment();
    }
  }, []);

  return (
    <NavBar>
      <div className="px-4 flex flex-col space-y-6">
        <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm">
          <Image src="/memo.png" alt="메모" width={30} height={30} />
          {session ? (
            <div className="flex flex-col">
              <h2 className="text-lg">
                <span className="font-semibold">{session.user?.name}</span>
                님의 상담노트 목록
              </h2>
              <p className="text-xs">{message}</p>
            </div>
          ) : (
            <h2 className="text-lg">상담노트 목록</h2>
          )}
        </div>
        <NoteTable freeUse={freeUse} />
      </div>
    </NavBar>
  );
};

export default ConsultingNote;
