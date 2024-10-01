"use client"

import Image from "next/image";
import Link from "next/link";
import MemoDescription from "./MemoDescription";
import { useAtomValue } from "jotai";
import { widthAtom } from "@/lib/atomState";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const DescriptionTwo = () => {
  const width = useAtomValue(widthAtom);
  const isDesktop = width >= 1024;

  const descriptionArr = [
    "자유양식으로 메모업로드 가능",
    "메모에 지도정보 첨부 가능",
  ];

  return (
    <div className="flex flex-col space-y-5 rounded-xl shadow-sm bg-green-100 pl-4 pr-10 lg:px-20 pb-5 lg:flex-row lg:space-x-10">
      <div className="flex flex-col space-y-5 lg:pt-20 lg:mx-auto xl:w-[60%]">
        <div className="flex items-center space-x-2 pt-5">
          <Image src="/memo2.png" alt="메모" width={!isDesktop ? 30 : 50} height={!isDesktop ? 30 : 50} />
          <h2 className="text-xl font-semibold lg:text-3xl xl:text-6xl">중개메모</h2>
        </div>
        <h2 className="text-lg lg:text-3xl lg:break-keep">
          중개업무 중 메모가 필요할 때 유용하게 사용해보세요!
        </h2>
        <p className="lg:break-keep">
          중개업무 도중 메모를 하고, 나중에 확인할 때 메모를 못 찾는 경우에
          대비해서 중개메모 서비스를 통해 안정된 중개업무를 누려보세요.
        </p>
        <div className="flex flex-col space-y-1">
          {descriptionArr.map((item, i) => (
            <div key={i} className="flex items-center space-x-1">
              <CheckCircleIcon className="w-6 h-6 text-green-500 lg:w-7 lg:h-7" />
              <p className="text-sm lg:text-base lg:leading-8">{item}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href="/consultingMemo"
            className="bg-green-500 hover:bg-green-600 text-white  px-3 py-2 rounded-md text-center transition-colors"
          >
            무료 사용해보기
          </Link>
          <MemoDescription />
        </div>
      </div>
      <img
        src={"/memoPage.png"}
        alt="메모페이지"
        className="object-cover object-center rounded-md shadow-2xl shadow-green-500/40 skew-y-12 scale-90 lg:w-96"
      />
    </div>
  );
};

export default DescriptionTwo;
