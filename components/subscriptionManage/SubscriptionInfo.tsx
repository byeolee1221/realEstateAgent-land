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
import { useEffect, useState } from "react";
import axios from "axios";
import { getPaymentDate, getTid } from "@/lib/subscriptionUtils";

interface IProps {
  userEmail: string;
  userName: string;
  status: string;
}

interface IPayment {
  itemName: string;
  amount: number;
}

const SubscriptionInfo = (props: IProps) => {
  const [userPayment, setUserPayment] = useState<IPayment>();
  const [approvedAt, setApprovedAt] = useState<string | undefined>("");
  const [error, setError] = useState("");

  const userInfoArr = [
    { id: 1, title: "구독시작일", value: approvedAt },
    { id: 2, title: "구독아이템", value: userPayment?.itemName },
  ];

  // 유저 결제정보 가져오기
  useEffect(() => {
    const getUserPayment = async () => {
      const tid = await getTid();
      try {
        const response = await axios.post("/api/kakaoPay/userPayment", {
          tid,
        });

        if (response.status === 200) {
          setUserPayment(response.data);
        }
      } catch (error) {
        console.error("subscriptionInfo getUserPayment에서 오류 발생", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        }
      }
    };

    getUserPayment();
  }, []);

  // 유저 결제일(포맷변경) 가져오기
  useEffect(() => {
    const getApprovedDate = async () => {
      try {
        const approvedDate = await getPaymentDate();

        setApprovedAt(approvedDate?.formattedApprovedDate);
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
              <Image
                src="/user.png"
                alt="프로필"
                width={50}
                height={50}
                className="bg-slate-300 rounded-full p-2"
              />
              <h1 className="font-semibold">{props.userName}</h1>
            </div>
            <div className="flex items-center justify-between">
              {userInfoArr.map((data) => (
                <div
                  key={data.id}
                  className="flex flex-col space-y-1 bg-slate-100 rounded-md px-5 py-2 text-center shadow-sm"
                >
                  <h2 className="font-semibold">{data.title}</h2>
                  <span className="text-sm">{data.value}</span>
                </div>
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

export default SubscriptionInfo;
