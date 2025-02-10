import Link from "next/link";
import SubscribeAlert from "./SubscribeAlert";

interface CreateNoteButtonProps { 
  countZero: boolean;
  subscriptionStatus: string;
  endBenefit: boolean;
}

const CreateNoteButton = ({ countZero, subscriptionStatus, endBenefit }: CreateNoteButtonProps) => {
  if (!countZero || subscriptionStatus === "SUCCESS_PAYMENT" || !endBenefit) { 
    return (
      <Link href="/consultingNote/write" className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md text-white w-1/3 text-center">
        노트 만들기
      </Link>
    )
  }

  return <SubscribeAlert />;
};

export default CreateNoteButton;


