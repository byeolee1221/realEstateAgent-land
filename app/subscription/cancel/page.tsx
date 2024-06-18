"use client"

import { useEffect } from "react";

const SubscriptionCancel = () => {
  useEffect(() => {
    alert("사용자가 결제를 취소했습니다.");

    window.close();
  }, [])

  return;
}

export default SubscriptionCancel;