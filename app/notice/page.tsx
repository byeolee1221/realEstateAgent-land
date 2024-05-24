import NavBar from "@/components/navBar/NavBar";
import NoticeTable from "@/components/notice/NoticeTable";
import Image from "next/image";

const Notice = () => {
  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/notice.jpg')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
            공지사항
          </h1>
          <p>Notice</p>
        </div>
        <div className="px-4 flex flex-col space-y-6">
          <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm px-5">
            <Image src="/memo.png" alt="메모" width={30} height={30} />
            <h2 className="text-lg font-semibold">공지사항</h2>
          </div>
          <NoticeTable />
        </div>
      </div>
    </NavBar>
  );
};

export default Notice;
