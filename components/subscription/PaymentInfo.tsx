const PaymentInfo = () => {
  const infoArr = [
    "본 상품은 구매자가 지정된 갱신 주기에 맞춰 정기 결제되며, 결제 완료한 경우 이용기간 만료일의 다음날에, 구매자가 지정한 결제수단으로 결제가 진행됩니다.",
    "본 상품의 결제 수단 변경은 카카오페이를 통해서만 가능합니다.",
    "본 상품의 결제 및 환불에 관한 내용은 환불 정책 및 이용약관에 따릅니다.",
  ];

  return (
    <div className="flex flex-col space-y-2 px-4 w-full">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-semibold">정기구독 전 확인해주세요!</h1>
      </div>
      {infoArr.map((data, i) => (
        <div key={i} className="flex space-x-2 text-sm pl-4">
          <ul className="list-disc">
            <li>
              {data}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PaymentInfo;
