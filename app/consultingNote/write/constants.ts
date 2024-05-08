import * as z from "zod";

export const NoteSchema = z.object({
  customerName: z.string().min(1, { message: "이름을 입력해주세요." }).regex(/([A-Za-zㄱ-ㅎ가-힣])/).trim(),
  customerNumber: z.string().min(1, { message: "연락처를 입력해주세요." }).regex(/([0-9-])/).trim(),
  purposeUse: z.string().min(1, { message: "사용목적을 입력해주세요." }).regex(/([A-Za-zㄱ-ㅎ가-힣])/),
  kind: z.string().min(1, { message: "종류를 입력해주세요." }).regex(/([A-Za-zㄱ-ㅎ가-힣])/),
  transactionType: z.string().min(1, { message: "거래유형을 입력해주세요." }).regex(/([A-Za-zㄱ-ㅎ가-힣])/),
  date: z.string().date().min(1, { message: "상담일자를 입력해주세요." }).regex(/([0-9-])/),
  content: z.string().min(1, {message: "상담내용을 입력해주세요."})
})