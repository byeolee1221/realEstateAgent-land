"use client";

import { useSession } from "next-auth/react";
import NoteTableList from "./NoteTableList";
import CreateNoteButton from "./CreateNoteButton";
import AlertSection from "./AlertSection";
import { useSubscription } from "@/hooks/useSubscription";
import { useContentsList } from "@/hooks/useContentsList";
import { useFreeUseMessage } from "@/hooks/useFreeUseMessage";
import { useEffect, useState } from "react";
import { getCount } from "@/lib/utils";

const NoteTable = () => {
  const { data: session } = useSession();

  const [freeUse, setFreeUse] = useState<number>();

  const { subscriptionStatus, endBenefit } = useSubscription(session);
  const { note, error, isLoading } = useContentsList({
    session,
    href: "/api/consultingNote/noteList",
    location: "note",
  });
  const { countZero, freeUseMsg } = useFreeUseMessage(freeUse, session);

  // 상담노트 무료사용횟수 조회
  useEffect(() => {
    if (session) {
      getCount("상담노트", "/api/consultingNote/noteCount", setFreeUse);
    }
  }, []);

  return (
    <div className="flex flex-col space-y-4 xl:flex-row xl:justify-between xl:space-x-4 xl:space-y-0">
      <div className="flex flex-col space-y-4 xl:w-full">
        <div className="border rounded-sm xl:flex xl:justify-center">
          <NoteTableList isLoading={isLoading} note={note} error={error} session={session} />
        </div>
        {session && (
          <div className="flex justify-end">
            <CreateNoteButton
              countZero={countZero}
              subscriptionStatus={subscriptionStatus || ""}
              endBenefit={endBenefit}
            />
          </div>
        )}
      </div>
      <AlertSection freeUseMsg={freeUseMsg} />
    </div>
  );
};

export default NoteTable;
