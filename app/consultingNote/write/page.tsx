"use client"

import KakaoMap from "@/components/consultingNote/write/KakaoMap";
import NavBar from "@/components/navBar/NavBar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Write = () => {
  const router = useRouter();

  const onCancel = () => {
    router.back();
  }

  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/contract.jpg')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
            상담노트 작성
          </h1>
          <p>My consulting note</p> 
        </div>
        <div className="flex flex-col space-y-6 px-4">
          <div className="flex items-center space-x-2 bg-slate-100 w-1/2 p-2 rounded-md shadow-sm">
            <Image src="/write.png" alt="게시" width={30} height={30} />
            <h2 className="text-lg font-semibold">노트 작성하기</h2>
          </div>
          <form className="flex flex-col space-y-3 text-sm">
            <div className="flex flex-col space-y-1">
              <label htmlFor="customerName" className="text-xs text-gray-500">고객명</label>
              <input id="customerName" type="text" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="customerNumber" className="text-xs text-gray-500">고객연락처</label>
              <input id="customerNumber" type="tel" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="purposeUse" className="text-xs text-gray-500">사용목적</label>
              <input id="purposeUse" type="text" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="kind" className="text-xs text-gray-500">중개대상물 종류</label>
              <input id="kind" type="text" placeholder="예) 원룸 / 아파트 / 상가 등" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="transactionType" className="text-xs text-gray-500">거래유형</label>
              <input id="transactionType" type="text" placeholder="예) 월세 / 전세 / 매매 등" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="date" className="text-xs text-gray-500">상담일자</label>
              <input id="date" type="text" placeholder="예) 2024.04.15" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="content" className="text-xs text-gray-500">상담내용</label>
              <textarea id="content" rows={10} className="border p-1 focus:outline-none focus:border-blue-500 bg-transparent resize-none" />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="content" className="text-xs text-gray-500">상담 매물 위치정보</label>
                <KakaoMap />
              </div>
              <input id="content" type="text" value="" placeholder="추가버튼을 눌러주세요." className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors">게시하기</button>
              <button onClick={onCancel} className="border border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md transition-colors">취소</button>
            </div>
          </form>
        </div>
      </div>
    </NavBar>
  );
};

export default Write;
