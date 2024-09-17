"use client";

import Image from "next/image";
import DescriptionContact from "./DescriptionContact";
import { useAtomValue } from "jotai";
import { widthAtom } from "@/lib/atomState";

const DescriptionThree = () => {
  const width = useAtomValue(widthAtom);
  const isDesktop = width >= 1280;

  return (
    <div className="flex flex-col space-y-5 rounded-xl shadow-sm bg-yellow-100 pl-4 pr-10 pb-5 lg:px-20">
      <div className="flex items-center space-x-2 pt-5">
        <Image src="/icon.png" alt="그외" width={!isDesktop ? 30 : 40} height={!isDesktop ? 30 : 40} />
        <h2 className="text-xl font-semibold lg:text-4xl">그 외에도..</h2>
      </div>
      <p>
        공인중개사의 업무편의성 증대를 위해 여러 기능을 추가할 예정입니다.
        사용하시면서 아쉬웠던 부분, 있으면 좋을 것 같은 부분에 대해 알려주시면
        적극 검토하여 반영해 보겠습니다!
      </p>
      <div className="flex items-center space-x-2">
        <DescriptionContact />
      </div>
    </div>
  );
};

export default DescriptionThree;
