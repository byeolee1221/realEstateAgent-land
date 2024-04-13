import Image from "next/image";
import Link from "next/link";

const DescriptionThree = () => {
  return (
    <div className="flex flex-col space-y-5 rounded-xl shadow-sm bg-yellow-100 pl-4 pr-10 pb-5">
      <div className="flex items-center space-x-2 pt-5">
        <Image src="/icon.png" alt="그외" width={30} height={30} />
        <h2 className="text-xl font-semibold">그 외에도..</h2>
      </div>
      <p>공인중개사의 업무편의성 증대를 위해 여러 기능을 추가할 예정입니다. 사용하시면서 아쉬웠던 부분, 있으면 좋을 것 같은 부분에 대해 알려주시면 적극 검토하여 반영해 보겠습니다!</p>
      <div className="flex items-center space-x-2">
        <Link href="" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md text-center transition-colors">문의하기</Link>
      </div>
    </div>
  );
};

export default DescriptionThree;
