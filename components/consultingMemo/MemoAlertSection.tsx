import { CheckCircleIcon } from "@heroicons/react/24/outline";

const MemoAlertSection = ({ freeUseMsg }: { freeUseMsg: string }) => {
  const alertArr = [
    "무료체험은 계정당 5회에 한정됩니다.",
    `${freeUseMsg}`,
    "무료버전 메모는 계속 업데이트가 가능합니다.",
    "사용횟수가 차감되면 메모를 삭제해도 복구되지 않습니다.",
    "삭제는 각 메모의 세부페이지에서 가능합니다.",
    "메모는 본인외에는 확인할 수 없습니다.",
  ];

  return (
    <div className="flex flex-col space-y-2 bg-green-100 px-4 py-5 rounded-xl lg:w-[40%] lg:h-fit">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-semibold">사용 전 확인해주세요!</h1>
      </div>
      {alertArr.map((item, i) => (
        <div
          key={i}
          className="flex items-center space-x-2 text-sm w-full lg:items-start xl:items-center"
        >
          <CheckCircleIcon className="w-5 h-5 text-green-500 overflow-visible xl:w-6 xl:h-6" />
          <span className="tracking-tighter">{item}</span>
        </div>
      ))}
    </div>
  );
};

export default MemoAlertSection;
