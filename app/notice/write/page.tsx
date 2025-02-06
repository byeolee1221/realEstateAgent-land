"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { NoticeSchema } from "./constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NoticeWrite = () => {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof NoticeSchema>>({
    resolver: zodResolver(NoticeSchema),
    mode: "all",
    defaultValues: {
      title: "",
      content: "",
    }
  });

  const onSubmit = async (values: z.infer<typeof NoticeSchema>) => {
    try {
      const response = await axios.post("/api/notice", {
        title: values.title,
        content: values.content,
      });

      if (response.status === 200) {
        reset();
        router.push(`/notice/${response.data}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("notice write POST에서 에러 발생", error);
        return toast("오류 발생", {
          description: error.response?.data,
        });
      }
    }
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <div className="flex flex-col space-y-6 px-4">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit px-5 py-2 rounded-md shadow-sm">
        <Image src="/write.png" alt="게시" width={30} height={30} />
        <h2 className="text-lg font-semibold">공지사항 작성하기</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3 text-sm">
        <div className="flex flex-col space-y-1">
          <label htmlFor="title" className="text-xs text-gray-500">
            제목
          </label>
          <input
            {...register("title")}
            id="title"
            type="text"
            className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent"
          />
          {errors.title && <span className="error-text-start">{errors.title.message}</span>}
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="content" className="text-xs text-gray-500">
            내용
          </label>
          <textarea
            {...register("content")}
            id="content"
            rows={10}
            className="border p-1 focus:outline-none focus:border-blue-500 bg-transparent resize-none whitespace-pre-wrap"
          />
          {errors.content && <span className="error-text-start">{errors.content.message}</span>}
        </div>
        <div className="flex items-center justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-2 rounded-md transition-colors"
            disabled={!isValid}
          >
            {isSubmitting ? "게시중" : "게시하기"}
          </button>
          <button
            onClick={onCancel}
            className="border border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeWrite;
