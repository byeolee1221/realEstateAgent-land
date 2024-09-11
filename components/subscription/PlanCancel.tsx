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

interface IProps {
  tid: string | undefined;
}

const PlanCancel = (props: IProps) => {
  const router = useRouter();

  const onPaymentCancel = async () => {
    try {
      const response = await axios.post("/api/kakaoPay/cancel", {
        tid: props.tid
      });

      if (response.status === 200) {
        router.push("/mySubscription/paymentCancel");
      }
    } catch (error) {
      console.error("PlanCancel POST에서 API 오류 발생", error);
      if (axios.isAxiosError(error)) {
        alert(error.response?.data);
      } else {
        console.error("PlanCancel POST에서 서버 오류 발생", error);
        alert("서버에서 오류가 발생하여 해지되지 않았습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-slate-800 hover:bg-slate-900 text-white p-2 rounded-md transition-colors">
          구독 해지
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>구독 해지</AlertDialogTitle>
          <AlertDialogDescription>
            현재 구독중인 플랜을 해지하시겠습니까? 해지를 해도 다음결제일까지는 상품 이용이 가능합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onPaymentCancel}>해지하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PlanCancel;
