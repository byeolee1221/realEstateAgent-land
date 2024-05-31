import NoticeTable from "@/components/notice/NoticeTable";
import Image from "next/image";

const Notice = () => {
  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm px-5">
        <Image src="/memo.png" alt="메모" width={30} height={30} />
        <h2 className="text-lg font-semibold">공지사항</h2>
      </div>
      <NoticeTable />
    </div>
  );
};

export default Notice;
