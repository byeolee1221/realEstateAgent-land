import NoteItemList from "@/components/consultingNote/[id]/NoteItemList";
import { getNote } from "../action/getNote";

const NoteDetail = async ({ params }: { params: { id: string } }) => {
  const pathname = `/consultingNote/${params.id}`;
  const note = await getNote(params.id);

  return (
    <div className="px-4 flex flex-col space-y-6">
      <NoteItemList note={note} pathname={pathname} />
    </div>
  );
};

export default NoteDetail;
