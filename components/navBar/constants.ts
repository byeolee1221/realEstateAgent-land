import * as z from "zod";

export const ContactSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }).regex(/([A-Za-zㄱ-ㅎ가-힣0-9])/).trim(),
  content: z.string().min(1, {message: "내용을 입력해주세요."})
})