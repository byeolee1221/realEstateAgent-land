import NavBar from "@/components/navBar/NavBar";
import TermsMenu from "@/components/policy/TermsMenu";

const PaidServiceTerms = () => {
  return (
    <NavBar>
      <div className="w-full flex flex-col space-y-5 px-2 min-h-screen mb-5 mt-10">
        <TermsMenu />
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-bold">제1조 (목적)</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              이 약관은 중개랜드(이하 '회사'라 합니다)가 제공하는 중개랜드 유료서비스의 이용과
              관련하여 회사와 회원과의 권리, 의무 및 책임사항 기타 필요한 사항을 규정함을 목적으로
              합니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">제2조 (약관의 게시와 개정)</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              ① 회사는 이 약관을 회원이 그 전부를 인쇄할 수 있고 확인할 수 있도록 기술적 조치를
              취합니다.
            </p>
            <p>
              ② 회사는 회원이 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회 등과 같은
              중요한 내용을 회원이 쉽게 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을
              제공합니다.
            </p>
            <p>
              ③ 회사는 '콘텐츠산업진흥법', '전자상거래등에서의소비자보호에관한법률',
              '약관의규제에관한법률' 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수
              있습니다.
            </p>
            <p>
              ④ 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 서비스 초기 화면에 그
              개정약관의 적용일자 7일 전부터 적용일자 전일까지 공지합니다. 다만, 회원에게 불리한
              약관의 개정의 경우에는 30일 전부터 적용일자 전일까지 공지하며, 공지 외에 전자우편,
              구독서비스 페이지에서의 팝업 등의 전자적 수단을 통해 따로 통지하도록 합니다.
            </p>
            <p>
              ⑤ 회사가 전항에 따라 개정약관을 공지 또는 통지하면서 회원에게 전항의 공지기간 내에
              의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게 공지 또는
              통지하였음에도 회원이 명시적으로 거부의 의사표시를 하지 아니한 경우 회원이 개정약관에
              동의한 것으로 봅니다.
            </p>
            <p>
              ⑥ 회원이 개정약관의 적용에 동의하지 않는 경우 회사는 개정약관의 내용을 적용할 수
              없으며, 이 경우 회원은 이용계약을 해지할 수 있습니다. 다만, 기존 약관을 적용할 수 없는
              특별한 사정이 있는 경우에는 회사는 이용계약을 해지할 수 있습니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">제3조 (약관의 해석)</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 '콘텐츠진흥법',
              '전자상거래등에서의소비자보호에관한법률', '약관의규제에관한법률', 문화체육관광부장관이
              정하는 디지털콘텐츠 이용자보호지침, 기타 관련 법령, 중개랜드 서비스 약관 및 상관례에
              따릅니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">제4조 (회원에 대한 통지)</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              ① 회사가 회원에 대한 통지를 하는 경우 본 약관에 별도 규정이 없는 한 회원이 가입시
              제공한 전자우편, 서비스 내 팝업 등으로 할 수 있습니다.
            </p>
            <p>
              ② 회사는 회원 전체에 대한 통지의 경우 7일 이상 회사가 운영하는 서비스 내의
              공지사항게시판 등에 게시함으로써 제1항의 통지에 갈음할 수 있습니다. 다만, 회원 본인의
              거래에 관련하여 중대한 영향을 미치는 사항에 대하여는 제1항의 방법으로 통지합니다.
            </p>
            <p>
              ③ 회사는 회원의 연락처 변경 후 미수정 등으로 인하여 개별 통지가 어려운 경우에 한하여
              제2항의 공지로써 개별 통지를 한 것으로 봅니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">제5조 (유료서비스의 내용 등의 게시)</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              ① 회사는 다음 사항을 해당 유료서비스의 이용초기화면에 회원이 알기 쉽게 표시합니다.
            </p>
            <div className="flex flex-col space-y-2 indent-2 list-decimal">
              <li>유료서비스의 명칭 또는 제호</li>
              <li>유료서비스의 제작/제공자의 성명(법인인 경우에는 법인의 명칭), 주소, 전화번호</li>
              <li>유료서비스의 내용, 이용방법, 이용료 기타 이용조건</li>
            </div>
            <p>
              ② 회사의 유료서비스의 이용가능기기 및 이용에 필요한 최소한의 기술사양은 권장사양정보에
              따릅니다.
            </p>
            <p>
              ③ 회사는 유료서비스를 제공함에 있어 유료서비스의 교환·반품·보증과 그 대금 환불의 조건
              및 절차에 관한 사항을 제공합니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">제6조 (이용계약의 성립 등)</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              ① 회원은 회사가 제공하는 다음 또는 이와 유사한 절차에 의하여 이용신청을 합니다. 회사는
              계약 체결 전에 각 호의 사항에 관하여 회원이 정확하게 이해하고 실수 또는 착오없이
              거래할 수 있도록 정보를 제공합니다.
            </p>
            <div className="flex flex-col space-y-2 indent-2 list-decimal">
              <li>유료서비스의 확인 및 선택</li>
              <li>결제방법의 선택 및 결제정보의 입력</li>
              <li>유료서비스의 이용신청에 관한 확인 또는 회사의 확인에 대한 동의</li>
            </div>
            <p>
              ② 회사는 회원의 이용신청이 다음 각 호에 해당하는 경우에는 승낙하지 않거나 승낙을
              유보할 수 있습니다.
            </p>
            <div className="flex flex-col space-y-2 indent-2 list-decimal">
              <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
              <li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
              <li>서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우</li>
              <li>
                무료사용 기간 등 회사에서 제공하는 혜택을 남용하기 위한 재가입이라고 판단되는 경우
              </li>
              <li>기타 회원의 귀책사유로 승인이 불가능하다고 판단되는 경우</li>
            </div>
            <p>③ 이용계약의 성립시기는 '구매완료'를 신청절차 상에서 표시한 시점으로 합니다.</p>
            <p>
              ④ 회원이 유료서비스를 이용하기 위해서는 본 약관에 동의한 후 해당 유료서비스의
              이용조건에 따라 이용요금을 지급하여야 합니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">제7조 (유료서비스의 중단 및 변경)</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              ① 회사는 사업 종목의 전환, 사업의 포기 등의 이유로 유료서비스를 제공할 수 없게 되는
              경우에는 회사는 이 약관에서 정한 방법으로 회원에게 통지하고 당초 회사에서 제시한 조건
              또는 '콘텐츠이용자보호지침' 및 관련 법령 규정에서 정한 바에 따라 회원에게 보상합니다.
            </p>
            <p>
              ② 회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부
              또는 일부의 중개랜드 유료서비스를 변경할 수 있고, 변경 전 해당 서비스 초기화면에 관련
              사항을 게시합니다. 다만, 변경된 내용이 중대하거나 회원에게 불리한 경우에는 이 약관에서
              정한 방법으로 통지하고, 중대하거나 회원에게 불리한 변경 내용에 동의하지 않는 회원은
              제8조에서 정한 바에 따라 중개랜드 유료서비스 이용계약을 해지할 수 있습니다.
            </p>
            <p>
              ③ 회사는 유료서비스를 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 다만, 아래의 각
              호의 경우 유료서비스의 전부 또는 일부를 제한하거나 중단할 수 있습니다.
            </p>
            <div className="flex flex-col space-y-2 indent-2 list-decimal">
              <li>
                컴퓨터 등 정보통신설비의 유지·보수, 교체 등 작업을 위한 정기 또는 임시점검의 경우
              </li>
              <li>
                정전, 정보통신설비의 장애 또는 고장, 이용량 폭주나 통신두절 등으로 정상적인 서비스
                제공에 지장이 있는 경우
              </li>
              <li>
                관계사와의 계약 종료, 정부의 명령·규제 또는 운영상 상당한 이유가 있는 경우 등 회사의
                제반 사정으로 서비스의 전부 또는 일부를 유지할 수 없는 경우
              </li>
              <li>기타 천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우</li>
            </div>
            <p>
              ④ 전항에 의한 유료서비스 제공 중단의 경우 미리 제4조에서 정한 방법으로 회원에게
              통지합니다. 다만, 회사로서도 예측할 수 없거나 통제 불가능한 사유로 인한 경우에는
              사후에 통지할 수 있습니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">제8조 (회원의 청약철회 및 계약해지)</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              ① 회원은 본 약관에 따라 유료서비스를 이용하기 위해 유료 결제를 한 날로부터 7일 이내에
              회사에 대해 서비스의 이용에 관한 청약을 철회할 수 있습니다. 다만, 회사가 회원에게
              사전에 합의한 내용과 다르게 서비스를 제공하거나 서비스를 제공하지 않는 경우, 회원은
              유료 결제를 한 날로부터 3개월 이내 또는 해당 사실을 알거나 알 수 있었던 날로부터 30일
              이내에 회사에 대해 서비스의 이용에 관한 청약을 철회할 수 있습니다.
            </p>
            <p>
              ② 제1항에도 불구하고, 회원은 다음 각 호의 어느 하나에 해당하는 경우에는 청약철회를 할
              수 없습니다.
            </p>
            <div className="flex flex-col space-y-2 indent-2 list-decimal">
              <li>이용자의 사용 또는 일부 소비에 의하여 콘텐츠의 가치가 현저히 감소한 경우</li>
              <li>디지털콘텐츠 제공이 개시된 경우</li>
            </div>
            <p>
              ③ 회사는 청약철회가 불가능한 서비스나 콘텐츠에 대해서는 다음 각 호의 조치를 취합니다.
            </p>
            <div className="flex flex-col space-y-2 indent-2 list-decimal">
              <li>청약철회가 불가능한 유료서비스에 해당한다는 사실을 표시사항에 포함</li>
              <li>한시적 또는 일부 이용 등의 방법을 제공</li>
            </div>
            <p>
              ④ 청약철회 및 환불 요청은 각 서비스에서 제공하는 메뉴 및 문의사항을 통해 할 수 있으며,
              회원이 유료서비스 이용계약을 해지하는 경우 회사는 회원으로부터 지급받은 대금을 당초
              회사에서 정한 조건 또는 '콘텐츠이용자보호지침' 및 관련 법령 규정, 이 약관에서 정한
              바에 따라 회원에게 환불합니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">제9조 (이용계약 해제, 해지 및 이용제한)</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              ① 회원은 다음 각 호의 사유가 있을 때 이용계약을 해지 또는 해제할 수 있습니다. 계약의
              해제, 해지는 회원이 전화, 전자우편 등으로 그 의사를 표시한 때에 효력이 발생하고,
              회사는 회원의 의사표시를 수신한 후 지체없이 그 사실을 회원에게 회신합니다.
            </p>
            <div className="flex flex-col space-y-2 indent-2 list-decimal">
              <li>
                유료서비스의 하자를 회사가 보완, 수정할 수 없는 경우 유료서비스를 공급받은 날로부터
                1개월 이내
              </li>
              <li>
                유료서비스 이용 회원이 본 약관 또는 중개랜드 서비스이용약관의 개정, 변경에 동의하지
                않아 회원 탈퇴를 하거나 유료서비스 이용계약을 해지하는 경우
              </li>
              <li>
                '방문판매 등에 관한 법률'에 따른 계속거래에 해당하는 유료서비스의 이용계약을
                해지하는 경우
              </li>
              <li>
                기타 관련 법령이나 본 약관에 따라 회원이 유료서비스 이용계약을 해지 또는 해제하고자
                하는 경우
              </li>
            </div>
            <p>
              ② 회원은 제1항 제1호의 사유로 계약해제, 해지의 의사표시를 하기 전에 상당한 기간을
              정하여 서비스이용의 하자에 대한 치유를 요구할 수 있습니다. 다만, 회사가 하자의 치유가
              불가능하다고 판단하는 경우에는 즉시 그 사실을 회원에게 통지하고 이용계약을 해제,
              해지할 수 있습니다.
            </p>
            <p>
              ③ 회사는 회원이 중개랜드 서비스이용약관 또는 본 약관에 명시된 회원의 의무를 위반하였을
              경우, 또는 그러한 위법·부당한 행위가 있는 것으로 의심될 만한 상당한 이유가 있는 경우
              회원과의 유료서비스 이용계약을 해제, 해지하거나 또는 기간을 정하여 유료서비스의 이용을
              제한할 수 있습니다. 계약의 해제, 해지는 회사가 정한 통지 방법에 따라 회원에게 그
              의사를 표시한 떄에 효력이 발생합니다.
            </p>
            <p>
              ④ 회사의 해제, 해지 및 이용제한에 대하여 회원은 회사가 정한 절차에 따라 이의신청을 할
              수 있습니다. 이때 이의가 정당하다고 회사가 인정하는 경우, 회사는 즉시 서비스의 이용을
              재개합니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">제10조 (이용요금의 환불 및 제한)</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              ① 회사가 이용요금을 환불하는 경우 기본적으로 아래 각 호를 따릅니다. 단, 회사는 개별
              유료서비스에 대해 별도의 상세 환불정책을 운영할 수 있으며, 이 경우 아래 각 호 및 본
              약관의 다른 내용에도 불구하고 상세 환불정책에서 정한 바를 따릅니다. 별도의 상세
              환불정책이 적용되는 경우 회사는 해당 유료서비스의 구매 과정에서 주의사항으로 기재하는
              등 적절한 방식을 통해 안내합니다.
            </p>
            <div className="flex flex-col space-y-2 indent-2 list-decimal">
              <li>
                해당 유료서비스가 정기결제형 유료서비스인 경우 결제 후 이용일수가 없을 시, 결제 후
                7일 이내 계약해제, 해지를 하면 전액환불되며, 결제 후 7일 이후 계약해제, 해지를 하면
                결제금액의 90%만 환불이 가능합니다.
              </li>
            </div>
            <p>
              ② 회사는 제9조 제1항의 경우 회원에게 계약해제, 해지의 의사표시에 대하여 회신한
              날로부터 3영업일 이내에, 제9조 제 3항의 경우 회원에 대하여 계약해제, 해지의 의사표시를
              한 날로부터 3영업일 이내에 대금의 결제와 동일한 방법으로 유료서비스 이용요금을
              환급합니다.(단, 수납확인이 필요한 결제수단의 경우에는 수납확인일로부터 3영업일 이내에
              환급). 다만, 동일한 방법으로 환불이 불가한 경우에는 계좌이체의 방법으로 환불 조치할 수
              있으며 회사는 이를 회원에게 고지합니다.
            </p>
            <p>
              ③ 회사는 이용요금을 환불함에 있어서 회원이 신용카드 또는 전자화폐 등의 결제수단으로
              재화 등의 대금을 지급한 때에는 지체없이 당해 결제수단을 제공한 사업자로 하여금 재화
              등의 대금의 청구를 정지 또는 취소하도록 요청합니다. 다만, 수납확인이 필요한 결제수단의
              경우 및 회원이 유료서비스 이용으로부터 얻은 이익에 해당하는 금액을 공제하는 경우에는
              그러하지 아니할 수 있습니다.
            </p>
            <p>
              ④ 회사, 유료서비스 등의 대금을 지급받은 자 또는 회원과 유료서비스 이용계약을 체결한
              자가 동일인이 아닌 경우에 각자는 청약철회 또는 계약해제, 해지로 인한 대금 환급과
              관련한 의무의 이행에 있어서 연대하여 책임을 집니다.
            </p>
            <p>
              ⑤ 회사가 제9조 제3항에 따라 회원의 유료서비스 이용을 제한하거나 본 계약을 해제,
              해지하는 경우 회사는 회원에게 일체의 환불을 하지 않습니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">제11조 (책임 제한)</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              ① 회사는 관계법령의 변경, 천재지변 또는 이에 준하는 불가항력으로 인하여 유료서비스를
              제공할 수 없는 경우에는 유료서비스 제공에 관한 책임이 면제됩니다.
            </p>
            <p>
              ② 회사는 회원의 귀책사유로 인한 유료서비스 이용의 장애에 대하여는 회사의 귀책사유가
              없는 한 책임을 지지 않습니다.
            </p>
            <p>
              ③ 회사는 회원 상호간 또는 회원과 제3자간에 유료서비스를 매개로 하여 발생한 분쟁 등에
              대하여 회사의 귀책사유가 없는 한 책임을 지지 않습니다.
            </p>
            <p>
              ④ 회사는 회원이 유료서비스와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의
              내용에 관하여는 책임을 지지 않습니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">부칙</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>본 약관은 서비스 개시일부터 적용됩니다.</p>
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default PaidServiceTerms;
