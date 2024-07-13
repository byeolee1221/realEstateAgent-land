import axios from "axios";

// 구독자의 다음 결제일을 받아오는 유틸리티 함수
export async function getNextPaymentDate() {
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
    const nextPaymentDate = `${approvedDate.getFullYear()}-${(approvedDate.getMonth() + 2)
      .toString()
      .padStart(2, "0")}-${approvedDate.getDate().toString().padStart(2, "0")}`;

    return nextPaymentDate;
  } catch (error) {
    console.error("다음 결제일 받아오는 유틸리티 함수에서 오류 발생", error);
  }
}

// 회원의 구독상태를 받아오는 유틸리티 함수
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