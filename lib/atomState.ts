import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const approveState = atom({
  key: "approveState",
  default: false
});

export const nextPaymentState = atom({
  key: "nextPayment",
  default: "",
  effects_UNSTABLE: [persistAtom]
});