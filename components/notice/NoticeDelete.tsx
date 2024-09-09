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
  noticePath: string
}

const NoticeDelete = (props: IProps) => {
  const noticeId = props.noticePath.split("/notice/");
  const router = useRouter();

  const onDelete = async () => {
    try {
      const response = await axios.delete("/api/notice", {
        data: {
          noticePath: noticeId[1]
        }
      });

      if (response.status === 200) {
        alert("공지사항이 삭제되었습니다.");
        router.push("/notice");
      }
    } catch (error) {
      console.error("notice noticeDelete DELETE에서 API 오류 발생", error);
      if (axios.isAxiosError(error)) {
        return toast("오류 발생", {
          description: error.response?.data,
        });
      } else {
        console.error("notice noticeDelete DELETE에서 서버 오류 발생", error);
        return toast("서버 오류 발생", {
          description: "서버에서 오류가 발생하여 공지사항을 삭제할 수 없습니다.",
        });
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors">
          삭제
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>공지사항 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            공지사항을 삭제하시겠습니까?
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

export default NoticeDelete;
