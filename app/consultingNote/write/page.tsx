import Image from "next/image";
import ConsultingForm from "@/components/consultingNote/write/ConsultingForm";

const Write = () => {
  return (
    <div className="flex flex-col space-y-6 px-4">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit px-5 py-2 rounded-md shadow-sm">
        <Image src="/write.png" alt="게시" width={30} height={30} />
        <h2 className="text-lg font-semibold">노트 작성하기</h2>
      </div>
      <ConsultingForm />
    </div>
  );
};

export default Write;
