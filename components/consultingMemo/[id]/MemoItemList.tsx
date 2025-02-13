"use client";

import { useSession } from "next-auth/react";
import { MemoResponse } from "@/types/consultingMemo";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import MemoDelete from "../MemoDelete";
import { useRouter } from "next/navigation";
import { ViewOnlyMap } from "@/lib/ViewOnlyMap";

interface MemoItemListProps {
  memo: MemoResponse;
  pathname: string;
}

const MemoItemList = ({ memo, pathname }: MemoItemListProps) => {
  const { data: session } = useSession();
  const memoId = pathname.split("/consultingMemo/")[1];
  const router = useRouter();

  const memoArr = [
    { id: 1, title: "제목", content: memo?.title },
    { id: 2, title: "내용", content: memo?.content },
  ];

  useEffect(() => {
    if ("error" in memo) {
      toast("오류 발생", { description: memo.error });
    }
  }, [memo]);

  return (
    <>
      {memoArr.map((data) => (
        <div key={data.id} className="flex flex-col space-y-3 text-sm">
          <h2 className="text-xs text-gray-500">{data.title}</h2>
          <span className="border-b pb-1 whitespace-pre-wrap">
            {data.content}
          </span>
        </div>
      ))}
      <ViewOnlyMap location={memo?.location} />
      <div className="flex items-center justify-between space-x-2">
        {memo?.userEmail === session?.user?.email ? (
          <div className="flex items-center space-x-2">
            <Link
              href={`/consultingMemo/${memoId}/edit`}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors"
            >
              수정
            </Link>
            <MemoDelete memoPath={pathname} />
          </div>
        ) : null}
        <button
          onClick={() => router.push("/consultingMemo")}
          className="border border-green-500 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md transition-colors"
        >
          목록
        </button>
      </div>
    </>
  );
};

export default MemoItemList;

