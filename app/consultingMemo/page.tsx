import MemoTable from "@/components/consultingMemo/MemoTable";
import SubscriptionMessage from "@/lib/SubscriptionMessage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

const ConsultingMemo = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="px-4 flex flex-col space-y-6 lg:px-0">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm">
        <Image src="/memo2.png" alt="게시" width={30} height={30} />
        {session ? (
          <div className="flex flex-col">
            <h2 className="text-lg">
              <span className="font-semibold">{session.user?.name}</span>
              님의 중개메모 목록
            </h2>
            <SubscriptionMessage />
          </div>
        ) : (
          <h2 className="text-lg font-semibold">중개메모 목록</h2>
        )}
      </div>
      <MemoTable />
    </div>
  );
};

export default ConsultingMemo;
