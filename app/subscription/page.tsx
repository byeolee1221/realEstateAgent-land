import NavBar from "@/components/navBar/NavBar";
import Image from "next/image";
import Link from "next/link";

const Subscription = () => {
  const standardArr = [
    "상담노트 및 중개메모 무제한 사용 가능",
    "추후 추가될 새 기능 중의 일부",
  ];

  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm px-5">
        <Image src="/subscriptionIcon.png" alt="구독" width={30} height={30} />
        <h2 className="text-lg font-semibold">구독 안내</h2>
      </div>
      <Link
        href=""
        className="bg-yellow-100 rounded-md flex flex-col space-y-2 p-4 border-2 border-transparent hover:border-yellow-500 shadow-md transition-colors"
      >
        <h2 className="text-xl font-semibold">스탠다드</h2>
        <p>중개랜드에서 현재 운영중인 기본적인 구독방식입니다.</p>
        <h3 className="text-3xl font-semibold">10,000원 /월</h3>
        <div className="flex flex-col space-y-1">
          <h3>스탠다드 내용</h3>
          {standardArr.map((item, i) => (
            <div key={i} className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default Subscription;
