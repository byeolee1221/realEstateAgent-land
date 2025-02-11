"use client";

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

interface IProps {
  id: string
}

const ContactDelete = (props: IProps) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      const response = await axios.delete("/api/contact/contactRead", {
        data: {
          id: props.id
        }
      });

      if (response.status === 200) {
        alert("문의사항이 삭제되었습니다.");
        router.refresh();
      }
    } catch (error) {
      console.error("contactDelete DELETE에서 오류 발생", error);
      if (axios.isAxiosError(error)) {
        return toast("오류 발생", {
          description: error.response?.data,
        });
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors w-1/3">
          삭제
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[95%] rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>문의사항 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            문의사항을 삭제하시겠습니까?
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

export default ContactDelete;
