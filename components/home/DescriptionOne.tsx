import Image from "next/image";
import Link from "next/link";

const DescriptionOne = () => {
  const descriptionArr = [
    "상담한 고객정보 및 상담내용 업로드",
    "최초상담 이후 추가되는 상담내역 저장 가능",
    "상담내역 중개대상물의 지도정보 확인 가능",
  ];

  return (
    <div className="flex flex-col space-y-5 rounded-xl shadow-sm bg-blue-100 pl-4 pr-10 pb-5">
      <div className="flex items-center space-x-2 pt-5">
        <Image src="/memo.png" alt="메모" width={30} height={30} />
        <h2 className="text-xl font-semibold">상담노트</h2>
      </div>
      <h2 className="text-lg">고객과의 상담내역을 편리하게 관리해 보세요!</h2>
      <p>
        더 이상 양이 늘어나서 정리해야 할 걱정이 없습니다. 가장 심플하면서도
        필요한 요소는 모두 갖춘 상담노트 기능을 통해 업무의 효율성을 증대시켜
        보세요.
      </p>
      <div className="flex flex-col space-y-1">
        {descriptionArr.map((item, i) => (
          <div key={i} className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-blue-500"
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
      <div className="flex items-center space-x-2">
        <Link
          href="/consultingNote"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-center transition-colors"
        >
          무료 사용해보기
        </Link>
        <button className="border border-blue-500 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 text-center transition-colors">
          더 알아보기
        </button>
      </div>
      <img
        src={"/notePage.png"}
        alt="노트페이지"
        className="object-cover object-center rounded-md shadow-2xl shadow-blue-500/40 skew-y-12 scale-90"
      />
    </div>
  );
};

export default DescriptionOne;
