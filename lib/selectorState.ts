import { selector } from "recoil";
import { approveState, nextPaymentState } from "./atomState";

export const getApproveState = selector({
  key: "getApproveState",
  get: ({ get }) => {
    const value = get(approveState);

    return value;
  }
});

export const getNextPaymentState = selector({
  key: "getNextPayment",
  get: ({ get }) => {
    const value = get(nextPaymentState);

    return value;
  }
});