import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getTid } from "@/lib/subscriptionUtils";
import axios from "axios";

interface ISubscription {
  status: string;
  itemName: string;
  approvedAt: string;
  amount: string;
  userEmail: string;
  userName: string;
}

const SubscriptionList = () => {
  const [subscription, setSubscription] = useState<ISubscription[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserSubscriptionData = async () => {
      const tid = await getTid();

      try {
        const response = await axios.post("/api/subscriptionManage", {
          tid,
        });
  
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

  return (
    <div className="flex flex-col space-y-4">
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="text-sm tracking-tighter">
              <TableHead>번호</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead className="text-right">구독상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((data, i) => (
              <TableRow key={i} className="cursor-pointer">
                <TableCell>{i + 1}</TableCell>
                <TableCell>test@test.com</TableCell>
                <TableCell className="text-right">구독중</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubscriptionList;
