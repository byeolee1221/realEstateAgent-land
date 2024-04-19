import NavBar from "@/components/navBar/NavBar";
import Image from "next/image";

const MemoWrite = () => {
  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/consultingMemo.jpg')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
            중개메모 작성
          </h1>
          <p>My consulting Memo</p>
        </div>
        <div className="flex flex-col space-y-6 px-4">
          <div className="flex items-center space-x-2 bg-slate-100 w-1/2 p-2 rounded-md shadow-sm">
            <Image src="/write.png" alt="게시" width={30} height={30} />
            <h2 className="text-lg font-semibold">메모 작성하기</h2>
          </div>
          <form className="flex flex-col space-y-3 text-sm">
            <div className="flex flex-col space-y-1">
              <label htmlFor="title" className="text-xs text-gray-500">제목</label>
              <input id="title" type="text" className="border-b pb-1 focus:outline-none focus:border-green-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="content" className="text-xs text-gray-500">내용</label>
              <textarea id="content" rows={10} className="border p-1 focus:outline-none focus:border-green-500 bg-transparent resize-none" />
            </div>
          </form>
        </div>
      </div>
    </NavBar>
  );
};

export default MemoWrite;
