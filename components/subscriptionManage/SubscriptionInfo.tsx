import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TableCell } from "../ui/table";
import { memo, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { calculateRefundAmount, getPaymentDate, getTid, getUpdateSubscription } from "@/lib/subscriptionUtils";
import { Skeleton } from "../ui/skeleton";

interface IProps {
  userEmail: string;
  userName: string;
  userImage: string;
  status: string;
}

interface IPayment {
  itemName: string;
  amount: number;
  canceledAt: Date | null;
  cancelAmount: number;
  cancelVat: number;
  cardInfo: string | undefined;
  payMethod: string;
}

interface IAvailableCancel {
  amount: number;
  vat: number;
}

const SubscriptionInfo = (props: IProps) => {
  const [userPayment, setUserPayment] = useState<IPayment>();
  const [approvedAt, setApprovedAt] = useState<string | undefined>("");
  const [updateApprovedAt, setUpdateApprovedAt] = useState<string | undefined>("");
  const [availableCancel, setAvailableCancel] = useState<IAvailableCancel>();
  const [error, setError] = useState("");

  const userInfoArr = [
    { id: 1, title: "구독 시작일", value: approvedAt },
    { id: 2, title: "구독 업데이트일", value: updateApprovedAt },
    { id: 3, title: "구독아이템", value: userPayment?.itemName },
    {
      id: 4,
      title: "구독취소일",
      value: `${userPayment?.canceledAt ? userPayment.cancelVat : "해당없음"}`,
    },
    { id: 5, title: "구독 취소금액", value: userPayment?.cancelAmount.toLocaleString("ko-KR") },
    { id: 6, title: "구독 취소부가세", value: userPayment?.cancelVat.toLocaleString("ko-KR") },
    { id: 7, title: "취소가능금액", value: availableCancel?.amount.toLocaleString("ko-KR") },
    { id: 8, title: "취소가능부가세", value: availableCancel?.vat.toLocaleString("ko-KR") },
    {
      id: 9,
      title: "카드사 정보",
      value: `${userPayment?.cardInfo ? userPayment?.cardInfo : "정보 없음"}`,
    },
    { id: 10, title: "결제방식", value: userPayment?.payMethod },
  ];

  // 유저 결제정보 가져오기
  const getUserPayment = useCallback(async () => {
    const tid = await getTid();
    try {
      const response = await axios.post("/api/kakaoPay/userPayment", {
        tid,
      });

      if (response.status === 200) {
        setUserPayment(response.data);
      }

      // 취소가능금액 조회
      const refundInfo = await calculateRefundAmount();
      setAvailableCancel(refundInfo);
    } catch (error) {
      console.error("subscriptionInfo getUserPayment에서 오류 발생", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
      }
    }
  }, []);

  useEffect(() => {
    getUserPayment();
  }, [getUserPayment]);

  // 유저 결제일(포맷변경) 가져오기
  useEffect(() => {
    const getApprovedDate = async () => {
      try {
        const [approvedDate, updateDate] = await Promise.all([
          getPaymentDate(),
          getUpdateSubscription()
        ])

        setApprovedAt(approvedDate?.formattedApprovedDate);
        setUpdateApprovedAt(updateDate);
      } catch (error) {
        console.error("subscriptionInfo getApprovedDate에서 오류 발생", error);
      }
    };
    
    getApprovedDate();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableCell>{props.userEmail}</TableCell>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>구독 정보</DialogTitle>
        </DialogHeader>
        {!error ? (
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col items-center space-y-2">
              {props.userImage ? (
                <img src={props.userImage} alt="프로필" className="w-14 h-14 rounded-full" />
              ) : (
                <Image
                  src="/user.png"
                  alt="프로필"
                  width={50}
                  height={50}
                  className="bg-slate-300 rounded-full p-2"
                />
              )}
              <h1 className="font-semibold">{props.userName}</h1>
            </div>
            <div className="flex flex-col space-y-2">
              {userInfoArr.map((data) => (
                <ul key={data.id} className="flex space-x-2 items-center list-disc pl-5">
                  <li className="font-semibold">{data.title}</li>
                  {data.value ? (
                    <span className="text-sm">{data.value}</span>
                  ) : (
                    <Skeleton className="h-4 w-40" />
                  )}
                </ul>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors">
              닫기
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(SubscriptionInfo);
