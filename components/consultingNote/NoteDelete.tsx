import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IProps {
  postPath: string;
}

const NoteDelete = (props: IProps) => {
  const router = useRouter();
  const postId = props.postPath.split("/consultingNote/");

  const onDelete = async () => {
    try {
      const response = await axios.delete("/api/consultingNote", {
        data: {
          postPath: postId[1],
        },
      });

      if (response.status === 200) {
        alert("상담노트가 삭제되었습니다.");
        router.push("/consultingNote");
      }
    } catch (error: any) {
      console.log("consultingNote noteDelete DELETE에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors">
          삭제
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>상담노트 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            상담노트를 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NoteDelete;
