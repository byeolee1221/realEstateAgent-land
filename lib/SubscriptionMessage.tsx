import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { getPaymentDate } from "./subscriptionUtils";

interface ISubscribe {
  status: string;
  itemName: string;
}

interface IProps {
  subscribe: ISubscribe | undefined;
}

const SubscriptionMessage = (props: IProps) => {
  const { data: session } = useSession();

  const [message, setMessage] = useState("");
  const [nextPayment, setNextPayment] = useState<string | undefined>("");

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
    if (!props.subscribe) {
      setMessage("구독정보를 가져오고 있습니다.");
    } else {
      const { status, itemName } = props.subscribe;
  
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
  }, [props.subscribe, nextPayment]);

  return (
    <p className="text-xs">{message}</p>
  )
}

export default memo(SubscriptionMessage);