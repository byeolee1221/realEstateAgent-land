import MemoItemList from "@/components/consultingMemo/[id]/MemoItemList";
import { getMemo } from "../action/getMemo";

const MemoDetail = async ({ params }: { params: { id: string } }) => {
  const pathname = `/consultingMemo/${params.id}`;
  const memo = await getMemo(params.id);

  return (
    <div className="px-4 flex flex-col space-y-6">
      <MemoItemList memo={memo} pathname={pathname} />
    </div>
  );
};

export default MemoDetail;
