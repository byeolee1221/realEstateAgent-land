"use client";

import NoticeDelete from "@/components/notice/NoticeDelete";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface INotice {
  title: string;
  content: string;
  authorEmail: string;
}

const NoticeDetail = () => {
  const { data: session } = useSession();
  const [notice, setNotice] = useState<INotice>();

  const router = useRouter();
  const pathname = usePathname();
  const noticeUrl = pathname.split("/notice/");
  const noticeId = noticeUrl[1];

  useEffect(() => {
    const getNotice = async () => {
      try {
        const response = await axios.get(`/api/notice?url=${pathname}`);

        if (response.status === 200) {
          setNotice(response.data);
        }
      } catch (error: any) {
        console.log("notice noteDetail GET에서 오류 발생", error);
        return toast("오류 발생", {
          description: error.response.data,
        });
      }
    };

    getNotice();
  }, []);

  const NoticeArr = [
    { title: "제목", content: notice?.title },
    { title: "내용", content: notice?.content },
  ];

  return (
    <div className="px-4 flex flex-col space-y-6">
      {NoticeArr.map((data, i) => (
        <div key={i} className="flex flex-col space-y-3 text-sm">
          <h2 className="text-xs text-gray-500">{data.title}</h2>
          <span className="border-b pb-1 whitespace-pre-wrap">
            {data.content}
          </span>
        </div>
      ))}
      <div className="flex items-center justify-between space-x-2">
        {notice?.authorEmail === session?.user?.email ? (
          <div className="flex items-center space-x-2">
            <Link
              href={`/notice/${noticeId}/edit`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors"
            >
              수정
            </Link>
            <NoticeDelete noticePath={pathname} />
          </div>
        ) : null}
        <button
          onClick={() => router.push("/notice")}
          className="border border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md transition-colors"
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default NoticeDetail;
