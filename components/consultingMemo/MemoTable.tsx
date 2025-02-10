"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getCount } from "@/lib/utils";
import { useSubscription } from "@/hooks/useSubscription";
import { useFreeUseMessage } from "@/hooks/useFreeUseMessage";
import MemoTableList from "./MomoTableList";
import MemoAlertSection from "./MemoAlertSection";
import CreateMemoButton from "./CreateMemoButton";
import { useContentsList } from "@/hooks/useContentsList";

const MemoTable = () => {
  const { data: session } = useSession();

  const [freeUse, setFreeUse] = useState<number>();
  const { subscriptionStatus, endBenefit } = useSubscription(session);
  const { countZero, freeUseMsg } = useFreeUseMessage(freeUse, session);
  const { memo, error, isLoading } = useContentsList({
    session,
    href: "/api/consultingMemo/memoList",
    location: "memo",
  });

  // 중개메모 무료사용횟수 조회
  useEffect(() => {
    if (session) {
      getCount("중개메모", "/api/consultingMemo/memoCount", setFreeUse);
    }
  }, []);

  return (
    <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:space-x-4 lg:space-y-0">
      <div className="flex flex-col space-y-4 lg:w-full">
        <div className="border rounded-sm lg:flex lg:justify-center">
          <MemoTableList session={session} isLoading={isLoading} memo={memo} error={error} />
        </div>
        {session && (
          <div className="flex justify-end">
            <CreateMemoButton
              countZero={countZero}
              subscriptionStatus={subscriptionStatus || ""}
              endBenefit={endBenefit}
            />
          </div>
        )}
      </div>

      <MemoAlertSection freeUseMsg={freeUseMsg} />
    </div>
  );
};

export default MemoTable;
