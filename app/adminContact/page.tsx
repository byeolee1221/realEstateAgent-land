import ContactTabs from "@/components/adminContact/ContactTabs";
import { getContactData, getOpinionData } from "./action/admin";
import Image from "next/image";

const AdminContact = async () => {
  const data = await fetchData();

  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm px-5">
        <Image src="/memo.png" alt="메모" width={30} height={30} />
        <h2 className="text-lg font-semibold">접수된 문의사항</h2>
      </div>
      <ContactTabs doc={data?.doc} opinion={data?.userOpinion} />
    </div>
  );
};

export default AdminContact;

const fetchData = async () => {
  try {
    const [doc, userOpinion] = await Promise.all([getContactData(), getOpinionData()]);

    if (!doc || !userOpinion) {
      console.error("데이터를 불러오는데 실패했습니다.");
      return { doc: [], userOpinion: [] };
    }

    return { doc, userOpinion };
  } catch (error) {
    console.error("데이터를 불러오는데 실패했습니다.");
    return;
  }
};
