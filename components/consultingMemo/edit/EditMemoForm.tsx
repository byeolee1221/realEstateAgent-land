"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MemoEditSchema } from "@/app/consultingMemo/[id]/edit/constants";
import { usePathname, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IMemo } from "@/app/consultingMemo/[id]/page";
import FormInput from "@/components/FormInput";
import { MemoFormArr } from "@/lib/formConfig";
import { EditableMap } from "@/lib/EditableMap";

const EditMemoForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const memoId = pathname.split("/")[2];

  const [memo, setMemo] = useState<IMemo>();

  const methods = useForm<z.infer<typeof MemoEditSchema>>({
    resolver: zodResolver(MemoEditSchema),
    mode: "all",
    defaultValues: {
      title: "",
      content: "",
      location: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof MemoEditSchema>) => {
    try {
      const response = await axios.post(`/api/consultingMemo/memoEdit`, {
        memoId,
        currentUser: session?.user?.email,
        title: values.title,
        content: values.content,
        location: values.location,
      });

      if (response.status === 200) {
        methods.reset();
        router.push(`/consultingMemo/${response.data}`);
      }
    } catch (error) {
      console.error("consultingMemo memoEdit POST에서 API 오류 발생", error);
      if (axios.isAxiosError(error)) {
        return toast("오류 발생", {
          description: error.response?.data,
        });
      }
    }
  };

  useEffect(() => {
    const getMemo = async () => {
      try {
        const response = await axios.get(`/api/consultingMemo/memoEdit`, {
          params: {
            memoId,
          },
        });

        if (response.status === 200) {
          setMemo(response.data);
        }
      } catch (error) {
        console.error("consultingNote noteEdit GET에서 API 오류 발생", error);
        if (axios.isAxiosError(error)) {
          return toast("오류 발생", {
            description: error.response?.data,
          });
        }
      }
    };

    getMemo();
  }, []);

  useEffect(() => {
    methods.reset({
      title: memo?.title,
      content: memo?.content,
      location: memo?.location,
    });
  }, [memo, methods.reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-3 text-sm">
        {MemoFormArr.map((item) => (
          <FormInput key={item.id} {...item} location="memo" />
        ))}
        <EditableMap type="memo" location={memo?.location} />
        <div className="flex items-center justify-end space-x-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-500 text-white px-3 py-2 rounded-md transition-colors"
            disabled={methods.formState.isSubmitting}
          >
            {methods.formState.isSubmitting ? "수정중" : "수정하기"}
          </button>
          <button
            type="button"
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

export default EditMemoForm;
