import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { TableCell } from "../ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { getTid } from "@/lib/subscriptionUtils";

interface IProps {
  userEmail: string;
  userName: string;
  status: string;
}

interface IPayment {
  itemName: string;
  approvedAt: Date;
  amount: number;
}

const SubscriptionInfo = (props: IProps) => {
  const [userPayment, setUserPayment] = useState<IPayment>();
  const [error, setError] = useState("");

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableCell>{props.userEmail}</TableCell>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>구독 정보</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <Image
              src="/user.png"
              alt="프로필"
              width={50}
              height={50}
              className="bg-slate-300 rounded-full p-2"
            />
            {!error ? (
              <div className="flex flex-col items-center">
                <h1 className="font-semibold">{props.userName}</h1>
                <h2 className="text-sm">
                  <span className="text-blue-500">{userPayment?.itemName}</span> {props.status}
                </h2>
              </div>
            ) : (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className=""></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionInfo;
