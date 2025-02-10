import { getPaymentDate, getSubscriptionStatus } from "@/lib/subscriptionUtils";
import { formatDate } from "@/lib/utils";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

export const useSubscription = (session: Session | null) => {
  const [nextPayment, setNextPayment] = useState<string | undefined>("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | undefined>("");
  const [endBenefit, setEndBenefit] = useState(false);

  useEffect(() => {
    if (!session) return;

    // 유틸리티 함수에서 다음 결제일, 구독상태 가져오기 (병렬처리로 수정)
    const fetchSubscriptionData = async () => {
      try {
        const [nextPaymentDate, subscriptionStatus] = await Promise.all([
          getPaymentDate(),
          getSubscriptionStatus(),
        ]);

        setNextPayment(nextPaymentDate?.nextPaymentDate);
        setSubscriptionStatus(subscriptionStatus);
      } catch (error) {
        console.error("NoteTable fetchSubscriptionData에서 오류 발생", error);
      }
    };

    fetchSubscriptionData();
  }, [session]);

  // 구독 혜택 종료 체크
  useEffect(() => {
    // 구독해지 및 다음 결제일
    const subscriptionCancel = subscriptionStatus === "CANCEL_PAYMENT" && nextPayment !== "";

    if (!subscriptionCancel) return;

    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);
    setEndBenefit(formattedCurrentDate === nextPayment);
  }, [subscriptionStatus, nextPayment]);

  return { nextPayment, subscriptionStatus, endBenefit };
};
