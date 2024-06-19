import Image from "next/image";

const MySubscription = () => {
  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm">
        <Image src="/subscriptionIcon.png" alt="구독" width={30} height={30} />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">내 구독관리</h2>
          <span className="text-xs text-gray-500">구독조회 및 취소를 할 수 있습니다.</span>
        </div>
      </div>
    </div>
  );
}

export default MySubscription;