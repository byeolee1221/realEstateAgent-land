"use client"

import { useEffect } from "react";

const SubscriptionFail = () => {
  useEffect(() => {
    alert("결제 실패했습니다. 결제하시려면 다시 시도해주세요.");

    window.close();
  }, []);

  return;
}

export default SubscriptionFail;