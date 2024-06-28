import { selector } from "recoil";
import { approveState } from "./atomState";

export const getApproveState = selector({
  key: "getApproveState",
  get: ({ get }) => {
    const value = get(approveState);

    return value;
  }
});


