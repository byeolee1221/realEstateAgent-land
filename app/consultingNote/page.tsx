import NoteTable from "@/components/consultingNote/NoteTable";
import NavBar from "@/components/navBar/NavBar";
import Image from "next/image";

const ConsultingNote = () => {
  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/contract.jpg')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">상담노트</h1>
          <p>My consulting note</p>
        </div>
        <div className="px-4 flex flex-col space-y-6">
          <div className="flex items-center space-x-2 bg-slate-100 w-3/4 p-2 rounded-md shadow-sm">
            <Image src="/memo.png" alt="메모" width={30} height={30} />
            <div className="flex flex-col">
              <h2 className="text-lg"><span className="font-semibold">바위별</span>님의 상담노트 목록</h2>
              <p className="text-xs">무료사용가능 횟수: 1회</p>
            </div>
          </div>
          <NoteTable />
        </div>
      </div>
    </NavBar>
  );
}

export default ConsultingNote;