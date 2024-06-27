import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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

interface IProps {
  id: string;
}

const OpinionDelete = (props: IProps) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      const response = await axios.delete("/api/userOpinion/opinionRead", {
        data: {
          id: props.id,
        },
      });

      if (response.status === 200) {
        alert("개선의견이 삭제되었습니다.");
        router.refresh();
      }
    } catch (error: any) {
      console.error("opinionDelete GET에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors w-1/3">
          삭제
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[95%] rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>개선의견 삭제</AlertDialogTitle>
          <AlertDialogDescription>개선의견을 삭제하시겠습니까?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OpinionDelete;
