"use client";

import MemoTable from "@/components/consultingMemo/MemoTable";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ISubscribe {
  status: string;
  itemName: string;
}

const ConsultingMemo = () => {
  const { data: session } = useSession();

  const [freeUse, setFreeUse] = useState(5);
  const [subscribe, setSubscribe] = useState<ISubscribe>();
  const [tid, setTid] = useState("");

  // 중개메모 무료사용횟수 조회
  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await axios.get("/api/consultingMemo/memoCount");

        if (response.status === 200) {
          setFreeUse(response.data);
        }
      } catch (error: any) {
        console.error("중개메모 getCount에서 오류 발생", error);
        return toast("오류 발생", {
          description: error.response.data,
        });
      }
    }
  }, [])

  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm">
        <Image src="/memo2.png" alt="게시" width={30} height={30} />
        {session ? (
          <div className="flex flex-col">
            <h2 className="text-lg">
              <span className="font-semibold">{session.user?.name}</span>
              님의 중개메모 목록
            </h2>
            <p className="text-xs">무료사용가능 횟수: <span>{freeUse}</span>회</p>
          </div>
        ) : (
          <h2 className="text-lg">중개메모 목록</h2>
        )}
      </div>
      <MemoTable />
    </div>
  );
};

export default ConsultingMemo;
