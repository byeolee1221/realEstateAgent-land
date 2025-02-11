import ContactTabs from "@/components/adminContact/ContactTabs";
import { getContactData, getOpinionData } from "./action/admin";
import Image from "next/image";

const AdminContact = async () => {
  const [doc, userOpinion] = await Promise.all([
    getContactData(),
    getOpinionData()
  ]);

  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm px-5">
        <Image src="/memo.png" alt="메모" width={30} height={30} />
        <h2 className="text-lg font-semibold">접수된 문의사항</h2>
      </div>
      <ContactTabs doc={doc} opinion={userOpinion} />
    </div>
  );
};

export default AdminContact;