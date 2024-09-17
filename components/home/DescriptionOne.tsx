"use client"

import Image from "next/image";
import Link from "next/link";
import NoteDescription from "./NoteDescription";
import { useAtomValue } from "jotai";
import { widthAtom } from "@/lib/atomState";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const DescriptionOne = () => {
  const width = useAtomValue(widthAtom);
  const isDesktop = width >= 1280;

  const descriptionArr = [
    "상담한 고객정보 및 상담내용 업로드",
    "최초상담 이후 추가되는 상담내역 저장 가능",
    "상담내역 중개대상물의 지도정보 확인 가능",
  ];

  return (
    <div className="flex flex-col space-y-5 rounded-xl shadow-sm bg-blue-100 pl-4 pr-10 lg:px-20 pb-5 lg:flex-row lg:space-x-10">
      <div className="flex flex-col space-y-5 lg:w-[60%] lg:pt-20 lg:mx-auto">
        <div className="flex items-center space-x-2 pt-5">
          <Image src="/memo.png" alt="메모" width={!isDesktop ? 30 : 50} height={!isDesktop ? 30 : 50} />
          <h2 className="text-xl font-semibold lg:text-6xl">상담노트</h2>
        </div>
        <h2 className="text-lg lg:text-3xl">고객과의 상담내역을 편리하게 관리해 보세요!</h2>
        <p>
          더 이상 양이 늘어나서 정리해야 할 걱정이 없습니다. 가장 심플하면서도 필요한 요소는 모두 갖춘
          상담노트 기능을 통해 업무의 효율성을 증대시켜 보세요.
        </p>
        <div className="flex flex-col space-y-1">
          {descriptionArr.map((item, i) => (
            <div key={i} className="flex items-center space-x-1">
              <CheckCircleIcon className="w-6 h-6 text-blue-500 lg:w-7 lg:h-7" />
              <p className="text-sm lg:text-base lg:leading-8">{item}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="/consultingNote"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-center transition-colors"
          >
            무료 사용해보기
          </Link>
          <NoteDescription />
        </div>
      </div>
      <img
        src="/notePage.png"
        alt="노트페이지"
        className="object-cover object-center rounded-md shadow-2xl shadow-blue-500/40 skew-y-12 scale-90 lg:w-96"
      />
    </div>
  );
};

export default DescriptionOne;
