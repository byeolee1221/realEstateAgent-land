import * as z from "zod";

export const MemoEditSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }).regex(/([A-Za-zㄱ-ㅎ가-힣])/).trim(),
  content: z.string().min(1, { message: "메모를 입력해주세요." }),
  location: z.string().regex(/([A-Za-zㄱ-ㅎ가-힣0-9])/)
})