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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const AccountDisconnect = () => {
  const router = useRouter();
  const onAccountDelete = async () => {
    try {
      const response = await axios.delete("/api/setting");

      if (response.status === 200) {
        alert("연동이 해제되었습니다. 이용해주셔서 감사합니다.");
        signOut();
        router.push("/");
      }
    } catch (error: any) {
      console.log("setting AccountDelete DELETE에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center space-x-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <span>계정 연동해제</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[95%] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>계정연동 해제</AlertDialogTitle>
          <AlertDialogDescription>
            계정연동을 해제하시겠습니까? 연결 해제시 게시한 모든 게시글과 정보가
            삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onAccountDelete}>연동 해제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccountDisconnect;
