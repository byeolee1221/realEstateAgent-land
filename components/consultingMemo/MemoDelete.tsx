import { useRouter } from "next/navigation";
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
import axios from "axios";
import { toast } from "sonner";

interface IProps {
  memoPath: string;
}

const MemoDelete = (props: IProps) => {
  const router = useRouter();
  const memoId = props.memoPath.split("/consultingMemo/");
  // console.log(memoId);

  const onDelete = async () => {
    try {
      const response = await axios.delete("/api/consultingMemo", {
        data: {
          memoPath: memoId[1],
        },
      });

      if (response.status === 200) {
        alert("중개메모가 삭제되었습니다.");
        router.push("/consultingMemo");
      }
    } catch (error) {
      console.error("consultingMemo memoDelete DELETE에서 오류 발생", error);
      if (axios.isAxiosError(error)) {
        return toast("오류 발생", {
          description: error.response?.data,
        });
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors">
          삭제
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>중개메모 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            중개메모를 삭제하시겠습니까?
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

export default MemoDelete;
