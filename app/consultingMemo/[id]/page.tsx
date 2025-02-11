"use client";

import MemoDelete from "@/components/consultingMemo/MemoDelete";
import { useKakaomap } from "@/hooks/useKakaomap";
import { getPost } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface IMemo {
  userEmail: string;
  title: string;
  content: string;
  location: string;
  id: string;
}

const MemoDetail = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const memoUrl = pathname.split("/consultingMemo/");
  const memoId = memoUrl[1];

  const [memo, setMemo] = useState<IMemo>();

  useKakaomap({ location: memo?.location, isEditable: false });

  // 중개메모 불러오기
  useEffect(() => {
    getPost("중개메모", `/api/consultingMemo?url=${pathname}`, setMemo);
  }, []);

  const memoArr = [
    { id: 1, title: "제목", content: memo?.title },
    { id: 2, title: "내용", content: memo?.content },
  ];

  return (
    <div className="px-4 flex flex-col space-y-6">
      {memoArr.map((data) => (
        <div key={data.id} className="flex flex-col space-y-3 text-sm">
          <h2 className="text-xs text-gray-500">{data.title}</h2>
          <span className="border-b pb-1 whitespace-pre-wrap">
            {data.content}
          </span>
        </div>
      ))}
      <div className="flex flex-col space-y-3 text-sm">
        <h2 className="text-xs text-gray-500">참고 위치정보</h2>
        <span className="border-b pb-1">{memo?.location}</span>
        <div id="map" className="w-full h-72 md:h-96 border" />
      </div>
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
    </div>
  );
};

export default MemoDetail;
