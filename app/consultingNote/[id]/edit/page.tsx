import Image from "next/image";
import EditForm from "@/components/consultingNote/edit/EditForm";

const NoteEdit = () => {
  return (
    <div className="flex flex-col space-y-6 px-4">
      <div className="flex items-center space-x-2 bg-slate-100 w-1/2 p-2 rounded-md shadow-sm">
        <Image src="/write.png" alt="게시" width={30} height={30} />
        <h2 className="text-lg font-semibold">노트 수정하기</h2>
      </div>
      <EditForm />
    </div>
  );
};

export default NoteEdit;
