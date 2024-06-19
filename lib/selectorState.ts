import { selector } from "recoil";
import { approveState, tidState } from "./atomState";

export const getApproveState = selector({
  key: "getApproveState",
  get: ({ get }) => {
    const value = get(approveState);

    return value;
  }
});

export const getTidState = selector({
  key: "getTidState",
  get: ({ get }) => {
    const value = get(tidState);

    return value;
  }
});

