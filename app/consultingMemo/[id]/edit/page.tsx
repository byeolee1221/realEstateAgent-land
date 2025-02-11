import Image from "next/image";
import EditMemoForm from "@/components/consultingMemo/edit/EditMemoForm";

const MemoEdit = () => {
  return (
    <div className="flex flex-col space-y-6 px-4">
      <div className="flex items-center space-x-2 bg-slate-100 w-1/2 p-2 rounded-md shadow-sm lg:w-fit">
        <Image src="/write.png" alt="게시" width={30} height={30} />
        <h2 className="text-lg font-semibold">메모 수정하기</h2>
      </div>
      <EditMemoForm />
    </div>
  );
};

export default MemoEdit;
