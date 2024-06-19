
import { useRecoilState } from "recoil";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { approveState } from "@/lib/atomState";

const PaymentApprove = () => {
  const [approve, setApprove] = useRecoilState(approveState);

  const onApprove = () => {
    setApprove((prevState) => !prevState);
  };

  const precautiousArr = [
    "결제 금액에 부가가치세 10%가 포함됩니다.",
    "본 상품은 상담노트와 중개메모 사용 제약을 풀고, 추후 추가할 예정인 서비스의 일부분을 사용할 수 있는 상품입니다.",
    "본 상품은 구매자가 지정된 갱신 주기에 맞춰 정기 결제되며, 결제 완료한 경우 이용기간 만료일의 다음날에, 구매자가 지정한 결제수단으로 결제가 진행됩니다.",
    "본 상품의 결제 수단 변경은 카카오페이를 통해서만 가능합니다.",
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="py-2 hover:no-underline">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="approve" name="approve" onChange={onApprove} />
            <span>스탠다드 정기구독 결제에 동의합니다.</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {precautiousArr.map((data, i) => (
            <ul key={i} className="list-disc flex space-x-2 text-sm pl-5">
              <li>{data}</li>
            </ul>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PaymentApprove;
