import { z } from "zod";

export const UserOpinionSchema = z.object({
  opinion: z.string().min(1, { message: "개선의견이나 불편한 점을 적어주세요." }).regex(/([A-Za-zㄱ-ㅎ가-힣])/).trim()
});