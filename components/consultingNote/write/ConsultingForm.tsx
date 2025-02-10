"use client";

import { NoteSchema } from "@/app/consultingNote/write/constants";
import FormInput from "@/components/FormInput";
import { NoteFormArr } from "@/lib/formConfig";
import KakaoMap from "@/lib/Kakaomap";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ConsultingForm = () => {
  const router = useRouter();

  const methods = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    mode: "all",
    defaultValues: {
      customerName: "",
      customerNumber: "",
      purposeUse: "",
      kind: "",
      transactionType: "",
      date: "",
      content: "",
      location: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NoteSchema>) => {
    try {
      const response = await axios.post("/api/consultingNote", {
        customerName: values.customerName,
        customerNumber: values.customerNumber,
        purposeUse: values.purposeUse,
        kind: values.kind,
        transactionType: values.transactionType,
        date: values.date,
        content: values.content,
        location: values.location,
      });

      if (response.status === 200) {
        methods.reset();
        router.push(`/consultingNote/${response.data}`);
      }
    } catch (error) {
      console.error("consultingNote write POST에서 API 오류 발생", error);
      if (axios.isAxiosError(error)) {
        return toast("오류 발생", {
          description: error.response?.data,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-3 text-sm">
        {NoteFormArr.map((item) => (
          <FormInput
            key={item.id}
            {...item}
            location="note"
          />
        ))}
        <div className="flex flex-col space-y-1">
          <label htmlFor="content" className="text-xs text-gray-500">
            상담내용
          </label>
          <textarea
            {...methods.register("content")}
            id="content"
            rows={10}
            className="border p-1 focus:outline-none focus:border-blue-500 bg-transparent resize-none whitespace-pre-wrap"
          />
          {methods.formState.errors.content && (
            <span className="error-text-start">{methods.formState.errors.content.message}</span>
          )}
        </div>
        <KakaoMap type="note" />
        <div className="flex items-center justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-2 rounded-md transition-colors"
            disabled={!methods.formState.isValid}
          >
            {methods.formState.isSubmitting ? "게시중" : "게시하기"}
          </button>

          <button
            onClick={() => router.back()}
            className="border border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ConsultingForm;
