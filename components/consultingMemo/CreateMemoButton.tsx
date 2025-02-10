import Link from "next/link";
import SubscribeAlert from "../consultingNote/SubscribeAlert";

interface CreateMemoButtonProps {
  countZero: boolean;
  subscriptionStatus: string;
  endBenefit: boolean;
}

const CreateMemoButton = ({ countZero, subscriptionStatus, endBenefit }: CreateMemoButtonProps) => {
  if (!countZero || subscriptionStatus === "SUCCESS_PAYMENT" || !endBenefit) {
    return (
      <Link href="/consultingMemo/write" className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-white w-1/3 text-center">
        메모 만들기
      </Link>
    )
  }
  return <SubscribeAlert />
}

export default CreateMemoButton;
