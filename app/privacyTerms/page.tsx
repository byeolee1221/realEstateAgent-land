import NavBar from "@/components/navBar/NavBar";
import TermsMenu from "@/components/policy/TermsMenu";

const PrivacyTerms = () => {
  return (
    <NavBar>
      <div className="w-full flex flex-col space-y-5 px-2 min-h-screen mb-5 mt-10">
        <TermsMenu />
        <div className="flex flex-col space-y-4">
          <div className="text-sm flex flex-col space-y-2">
            <p>
              중개랜드는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와
              관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
            </p>
            <p>
              중개랜드는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항을 통하여 공지할
              것입니다.
            </p>
            <p>○ 본 방침은 서비스 개시일부터 시행됩니다.</p>
          </div>
          <h2 className="text-lg font-bold">1. 개인정보의 처리 목적</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              중개랜드는 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적
              이외의 용도로는 사용되지 않으며, 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.
            </p>
            <h3 className="font-semibold text-base">가. 홈페이지 회원가입 및 관리</h3>
            <p>
              회원가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리,
              서비스 부정이용 방지, 고충처리, 분쟁 조정을 위한 기록 보존 등을 목적으로 개인정보를
              처리합니다.
            </p>
            <h3 className="font-semibold text-base">나. 민원사무 처리</h3>
            <p>
              민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등을
              목적으로 개인정보를 처리합니다.
            </p>
            <h3 className="font-semibold text-base">다. 서비스 제공</h3>
            <p>서비스 제공, 본인인증 등을 목적으로 개인정보를 처리합니다.</p>
          </div>
          <h2 className="text-lg font-bold">2. 개인정보 처리 현황</h2>
          <div className="text-sm flex flex-col space-y-2 list-disc indent-2">
            <li>
              개인정보 항목: 고유식별 ID, 사용자명, 이메일, 회원이 등록한 사진, 가입일, 계정
              업데이트일
            </li>
            <li>수집방법: 홈페이지</li>
            <li>보유근거: 개인정보처리방침</li>
            <li>보유기간: 2년</li>
            <li>관련법령: 개인정보보호법</li>
          </div>
          <h2 className="text-lg font-bold">3. 개인정보 처리 및 보유 기간</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              ① 중개랜드는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를
              수집시에 동의 받은 개인정보 보유, 이용기간 내에서 개인정보를 처리, 보유합니다.
            </p>
            <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
            <p>1. 웹사이트 회원가입 및 서비스 제공</p>
            <p>
              웹사이트 회원가입 및 서비스 제공과 관련한 개인정보를 수집·이용에 관한 동의일로부터
              2년까지 위 이용목적을 위하여 보유·이용됩니다.
            </p>
            <div className="flex flex-col space-y-2 indent-2 list-disc">
              <li>보유근거: 개인정보처리방침</li>
              <li>관련법령: 개인정보보호법</li>
            </div>
          </div>
          <h2 className="text-lg font-bold">4. 개인정보의 제3자 제공에 관한 사항</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              ① 중개랜드는 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에
              해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">5. 정보주체의 권리·의무 및 그 행사방법</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>
            <p>
              ① 정보주체는 중개랜드에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수
              있습니다.
            </p>
            <div className="flex flex-col space-y-2 indent-2 list-decimal">
              <li>개인정보 열람요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </div>
            <p>
              ② 제1항에 따른 권리 행사는 중개랜드에 대해 전자우편 또는 웹사이트 내 문의창구를 통해
              하실 수 있으며, 중개랜드는 이에 대해 지체없이 조치하겠습니다.
            </p>
            <p>
              ③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 중개랜드는
              정정 또는 삭제를 완료할 때까지 개인정보를 이용하거나 제공하지 않습니다.
            </p>
          </div>
          <h2 className="text-lg font-bold">6. 개인정보의 파기</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              중개랜드는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 개인정보를
              파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.
            </p>
            <h3 className="font-semibold text-base">가. 파기절차</h3>
            <p>
              이용자가 제공에 동의한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 법령에
              따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이때, DB에 옮겨진 개인정보는 법률에 의한
              경우가 아니고서는 다른 목적으로 이용되지 않습니다.
            </p>
            <h3 className="font-semibold text-base">나. 파기기한</h3>
            <p>
              이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일
              이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 웹서비스의 종료 등 그
              개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는
              날로부터 5일 이내에 그 개인정보를 파기합니다.
            </p>
            <h3 className="font-semibold text-base">다. 파기방법</h3>
            <p>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</p>
          </div>
          <h2 className="text-lg font-bold">7. 개인정보의 안전성 확보 조치</h2>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              중개랜드는 개인정보보호법 제29조에 따라 다음과 같이 안정성 확보에 필요한 조치를 하고
              있습니다.
            </p>
            <p>① 개인정보에 대한 접근 제한</p>
            <p>② 개인정보의 암호화</p>
          </div>
          <h2 className="text-lg font-bold">8. 개인정보관리책임자 및 담당자의 연락처</h2>
          <div className="text-sm">
            귀하께서는 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을
            개인정보관리책임자에게 신고하실 수 있습니다. 중개랜드는 이용자들의 신고사항에 대해
            신속하게 충분한 답변을 드릴 것입니다.
          </div>
          <h2 className="text-lg font-bold">개인정보관리책임자</h2>
          <div className="text-sm flex flex-col space-y-2 indent-2 list-disc">
            <li>이름: 문창기</li>
            <li>소속: 중개랜드</li>
            <li>전화: 010-4624-7284</li>
            <li>메일: dev.mck1221@gmail.com</li>
          </div>
          <div className="text-sm flex flex-col space-y-2">
            <p>
              기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기
              바랍니다.
            </p>
            <div className="text-sm flex flex-col space-y-2 indent-2 list-disc">
              <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
              <li>대검찰청 사이버범죄수사단 (www.spo.go.kr / 국번없이 1301)</li>
              <li>경찰청 사이버범죄 신고시스템 (ecrm.police.go.kr / 국번없이 182)</li>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default PrivacyTerms;
