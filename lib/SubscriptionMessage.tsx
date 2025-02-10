"use client";

import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { getPaymentDate } from "./subscriptionUtils";
import { userPayment } from "./utils";
import { ISubscribe } from "@/types/subscribe";

const SubscriptionMessage = () => {
  const { data: session } = useSession();

  const [message, setMessage] = useState("");
  const [nextPayment, setNextPayment] = useState<string | undefined>("");
  const [subscribe, setSubscribe] = useState<ISubscribe>();

  // 결제 조회
  useEffect(() => {
    if (session) {
      userPayment("상담노트", "/api/kakaoPay/userPayment", setSubscribe);
    }
  }, []);

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
    if (!subscribe) {
      setMessage("구독정보를 가져오고 있습니다.");
    } else {
      const { status, itemName } = subscribe;
  
      if (status === "CANCEL_PAYMENT") {
        if (nextPayment) {
          setMessage(`${nextPayment}까지 구독혜택이 지속됩니다.`);
        } else {
          setMessage("구독이 종료되었습니다.");
        }
      } else if (status === "SUCCESS_PAYMENT") {
        setMessage(`${itemName}을 이용중입니다.`);
      }
    }
  }, [subscribe, nextPayment]);

  return (
    <p className="text-xs">{message}</p>
  )
}

export default memo(SubscriptionMessage);