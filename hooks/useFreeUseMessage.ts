import { Session } from "next-auth";
import { useEffect, useState } from "react";

export const useFreeUseMessage = (freeUse: number | undefined, session: Session | null) => { 
  const [countZero, setCountZero] = useState(false);
  const [freeUseMsg, setFreeUseMsg] = useState("");

  // 무료사용횟수
  useEffect(() => {
    setCountZero(freeUse === 0);
  }, [freeUse]);

  // 무료사용횟수 메세지 추가
  useEffect(() => {
    if (!session) {
      setFreeUseMsg("로그인하시면 남은 횟수를 확인하실 수 있습니다.");
      return;
    }

    if (freeUse === undefined) {
      setFreeUseMsg("무료사용횟수를 조회중입니다.");
      return;
    }

    setFreeUseMsg(
      freeUse > 0 ? `현재 남은 무료횟수는 ${freeUse}회입니다.` : "현재 모든 무료사용횟수를 이용하셨습니다."
    );
  }, [freeUse, session]);

  return { countZero, freeUseMsg };
};
