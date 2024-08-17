import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import axios from "axios";
import SubscriptionInfo from "./SubscriptionInfo";
import { getSubscriptionStatus } from "@/lib/subscriptionUtils";
import { Skeleton } from "../ui/skeleton";

interface ISubscription {
  approvedAt: Date;
  userEmail: string;
  userName: string;
  userImage: string;
  id: string;
}

const SubscriptionList = () => {
  const [subscription, setSubscription] = useState<ISubscription[]>([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  
  // DB의 구독정보 가져오기
  useEffect(() => {
    const getUserSubscriptionData = async () => {
      try {
        const response = await axios.get("/api/subscriptionManage");

        if (response.status === 200) {
          setSubscription(response.data);
        }
      } catch (error) {
        console.error("subscriptionList 클라이언트에서 오류 발생", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        }
      }
    };

    getUserSubscriptionData();
  }, []);

  useEffect(() => {
    const getStatus = async () => {
      try {
        setLoading(true);
        const subscriptionStatus = await getSubscriptionStatus();

        if (subscriptionStatus === "SUCCESS_PAYMENT") {
          setStatus("구독중");
        } else if (subscriptionStatus === "FAIL_PAYMENT") {
          setStatus("구독실패");
        } else if (subscriptionStatus === "CANCEL_PAYMENT") {
          setStatus("구독취소");
        }
      } catch (error) {
        console.error("subscriptionManage getStatus에서 오류 발생", error);
      } finally {
        setLoading(false);
      }
    };

    getStatus();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div className="border rounded-sm">
        {!isLoading ? (
          <Table>
            <TableHeader>
              <TableRow className="text-sm tracking-tighter">
                <TableHead>번호</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead className="text-right">구독상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscription.map((data, i) => (
                <TableRow key={data.id} className="cursor-pointer">
                  <TableCell>{i + 1}</TableCell>
                  <SubscriptionInfo
                    userEmail={data.userEmail}
                    userName={data.userName}
                    userImage={data.userImage}
                    status={status}
                  />
                  <TableCell className="text-right">{status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Skeleton className="w-full h-40 bg-slate-100" />
        )}
      </div>
      {error !== "" ? <h2 className="text-center p-2">{error}</h2> : null}
    </div>
  );
};

export default SubscriptionList;
