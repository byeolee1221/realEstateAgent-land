
import { useRecoilState } from "recoil";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { approveState } from "@/lib/atomState";

const PaymentApprove = () => {
  const [approve, setApprove] = useRecoilState(approveState);

  const onApprove = () => {
    setApprove((prevState) => !prevState);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="py-2 hover:no-underline">
          <div className="flex items-center space-x-2 text-sm">
            <input type="checkbox" id="approve" name="approve" onChange={onApprove} />
            <span>스탠다드 정기구독결제에 동의합니다.</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>정기결제 유의사항 표출</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PaymentApprove;
