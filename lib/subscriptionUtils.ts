import axios from "axios";
import { formatDate } from "./utils";

// tid값 받아오는 유틸리티 함수
export async function getTid() {
  try {
    const getTid = await axios.get("/api/kakaoPay/approve");
    let tid: string = "";

    if (getTid.status === 200) {
      tid = getTid.data.tid;
    }

    return tid;
  } catch (error) {
    console.error("tid값 받아오는 유틸리티 함수에서 오류 발생", error);
  }
}

// sid값 받아오는 유틸리티 함수
export async function getSid() {
  try {
    const getSid = await axios.get("/api/kakaoPay/approve");
    let sid: string = "";

    if (getSid.status === 200) {
      sid = getSid.data.sid;
    }

    return sid;
  } catch (error) {
    console.error("sid값 받아오는 유틸리티 함수에서 오류 발생", error);
  }
}

// 구독자의 결제일을 받아오는 유틸리티 함수
export async function getPaymentDate() {
  try {
    const getTid = await axios.get("/api/kakaoPay/approve");
    let tid: string = "";

    if (getTid.status === 200) {
      tid = getTid.data.tid;
    }

    const getPaymentApproveDate = await axios.post("/api/kakaoPay/userPayment", {
      tid,
    });

    let paymentApproveDate: string = "";

    if (getPaymentApproveDate.status === 200) {
      paymentApproveDate = getPaymentApproveDate.data.approvedAt;
    }

    const approvedDate = new Date(paymentApproveDate);

    // 결제일 포맷 변경
    const formattedApprovedDate = formatDate(approvedDate);

    // 다음 결제일
    const nextPaymentDate = `${approvedDate.getFullYear()}-${(approvedDate.getMonth() + 2)
      .toString()
      .padStart(2, "0")}-${approvedDate.getDate().toString().padStart(2, "0")}`;
      
    return { formattedApprovedDate, nextPaymentDate };
  } catch (error) {
    console.error("다음 결제일 받아오는 유틸리티 함수에서 오류 발생", error);
  }
}

// 회원의 구독상태를 받아오는 유틸리티 함수 (status만 반환)
export async function getSubscriptionStatus() {
  try {
    const getTid = await axios.get("/api/kakaoPay/approve");
    let tid: string = "";

    if (getTid.status === 200) {
      tid = getTid.data.tid;
    }

    const getPaymentInfo = await axios.post("/api/kakaoPay/userPayment", {
      tid,
    });

    let paymentStatus: string = "";

    if (getPaymentInfo.status === 200) {
      paymentStatus = getPaymentInfo.data.status;
    }

    return paymentStatus;
  } catch (error) {
    console.error("회원 구독상태 받아오는 유틸리티 함수에서 오류 발생", error);
  }
}

// 구독 후 서비스 이용하지 않은 상태에서의 환불가능금액 계산
export async function calculateRefundAmount() {
  try {
    let refundAmount = {
      amount: 0,
      vat: 0
    };

    const tid: string | undefined = await getTid();

    const cancelAvailableInfo = {
      approvedAt: "",
      cancelAvailableAmount: 0,
      cancelAvailableVat: 0
    };
    
    // 2회차 이상 구독중인지 확인
    const getSubscriptionInfo = await axios.get("/api/subscriptionManage");

    const subscriptionData = getSubscriptionInfo.data;

    // 기본적 결제정보 확인
    const getPaymentInfo = await axios.post("/api/kakaoPay/userPayment", {
      tid,
    });

    const paymentData = getPaymentInfo.data;
    // console.log(subscriptionData)
    if (subscriptionData[0].approvedAt) {
      cancelAvailableInfo.approvedAt = subscriptionData[0].approvedAt;
    } else {
      cancelAvailableInfo.approvedAt = paymentData.approvedAt;
    }

    cancelAvailableInfo.cancelAvailableAmount = paymentData.cancelAvailableAmount;
    cancelAvailableInfo.cancelAvailableVat = paymentData.cancelAvailableVat;

    // 구독 후 사용여부 확인 (무료사용횟수 이외 1건이라도 있으면(노트 2건부터, 메모 6건부터) 환불금액 0원)
    const getUseCount = await axios.post("/api/validateRefund", {
      userEmail: subscriptionData[0].userEmail
    });

    const count = getUseCount.data;
    
    // 구독 당일 포함하여 7일 후 날짜
    const approvedDate = new Date(cancelAvailableInfo.approvedAt);
    approvedDate.setDate(approvedDate.getDate() + 6);

    const availableRefundDate = formatDate(approvedDate);

    // 현재 날짜
    const currentDate = formatDate(new Date());

    if (count.note > 1 || count.memo > 5) {
      // 구독 후 서비스 이용하여 환불불가
      refundAmount.amount = 0;
      refundAmount.vat = 0;
    } else {
      if (currentDate <= availableRefundDate) {
        // 7일 이내 전액 환불
        refundAmount.amount = cancelAvailableInfo.cancelAvailableAmount;
        refundAmount.vat = cancelAvailableInfo.cancelAvailableVat;
      } else if (currentDate > availableRefundDate) {
        // 7일 이후 90% 환불
        refundAmount.amount = cancelAvailableInfo.cancelAvailableAmount - 1000;
        refundAmount.vat = cancelAvailableInfo.cancelAvailableVat - 100;
      } 
    }
    
    return refundAmount;
  } catch (error) {
    console.error("환불가능금액 계산 유틸리티 함수에서 오류 발생", error);
  }
}

// 2회차 이상 업데이트된 구독날짜 가져오기
export async function getUpdateSubscription() {
  try {
    const sid: string | undefined = await getSid();

    const getDate = await axios.post("/api/subscriptionManage/updateUser", {
      sid
    });

    const updateApprovedAt = getDate.data;
    
    return updateApprovedAt;
  } catch (error) {
    console.error("업데이트 구독날짜 전달 유틸리티 함수에서 오류 발생", error);
  }
}