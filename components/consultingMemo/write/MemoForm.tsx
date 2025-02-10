"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MemoSchema } from "@/app/consultingMemo/write/constants";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { MemoFormArr } from "@/lib/formConfig";
import FormInput from "@/components/FormInput";
import KakaoMap from "@/lib/Kakaomap";

const MemoForm = () => {
  const router = useRouter();

  const methods = useForm<z.infer<typeof MemoSchema>>({
    resolver: zodResolver(MemoSchema),
    mode: "all",
    defaultValues: {
      title: "",
      content: "",
      location: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof MemoSchema>) => {
    try {
      const response = await axios.post("/api/consultingMemo", {
        title: values.title,
        content: values.content,
        location: values.location,
      });

      if (response.status === 200) {
        methods.reset();
        router.push(`/consultingMemo/${response.data}`);
      }
    } catch (error) {
      console.error("consultingMemo write POST에서 API 오류 발생", error);
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
        {MemoFormArr.map((item) => (
          <FormInput
            key={item.id}
            {...item}
            location="memo"
          />
        ))}
        <KakaoMap type="memo" />
        <div className="flex items-center justify-end space-x-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-3 py-2 rounded-md transition-colors"
            disabled={!methods.formState.isValid}
          >
            {methods.formState.isSubmitting ? "게시중" : "게시"}
          </button>

          <button
            onClick={() => router.back()}
            className="border border-green-500 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default MemoForm;
