"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { INotice } from "../page";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NoticeEditSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

const NoticeEdit = () => {
  const [notice, setNotice] = useState<INotice>();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const getNotice = async () => {
      try {
        const response = await axios.get(
          `/api/notice/noticeEdit?url=${pathname}`
        );

        if (response.status === 200) {
          setNotice(response.data);
        }
      } catch (error) {
        console.error("notice noticeEdit GET에서 API 오류 발생", error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401 || error.response?.status === 403) {
            router.push("/");
          }
  
          return toast("오류 발생", {
            description: error.response?.data,
          });
        } else {
          console.error("notice noticeEdit GET에서 서버 오류 발생", error);
          return toast("서버 오류 발생", {
            description: "서버에서 오류가 발생하였으니 잠시 후 새로고침 해주세요.",
          });
        }
      }
    };

    getNotice();
  }, []);

  const form = useForm<z.infer<typeof NoticeEditSchema>>({
    resolver: zodResolver(NoticeEditSchema),
    defaultValues: {
      title: notice?.title,
      content: notice?.content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    form.reset({
      title: notice?.title,
      content: notice?.content,
    });
  }, [notice, form.reset]);

  const onSubmit = async (values: z.infer<typeof NoticeEditSchema>) => {
    try {
      const response = await axios.post(
        `/api/notice/noticeEdit?url=${pathname}`,
        {
          title: values.title,
          content: values.content,
        }
      );

      if (response.status === 200) {
        router.push(`/notice/${response.data}`);
      }
    } catch (error) {
      console.error("notice noticeEdit POST에서 API 오류 발생", error);
      if (axios.isAxiosError(error)) {
        return toast("오류 발생", {
          description: error.response?.data,
        });
      } else {
        console.error("notice noticeEdit POST에서 서버 오류 발생", error);
        return toast("서버 오류 발생", {
          description: "서버에서 오류가 발생하여 공지사항을 올릴 수 없습니다.",
        });
      }
    }
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <div className="flex flex-col space-y-6 px-4">
      <div className="flex items-center space-x-2 bg-slate-100 w-1/2 p-2 rounded-md shadow-sm">
        <Image src="/write.png" alt="게시" width={30} height={30} />
        <h2 className="text-lg font-semibold">공지사항 수정하기</h2>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 text-sm"
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="title" className="text-xs text-gray-500">
            제목
          </label>
          <input
            {...form.register("title")}
            id="title"
            type="text"
            className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="content" className="text-xs text-gray-500">
            내용
          </label>
          <textarea
            {...form.register("content")}
            id="content"
            rows={10}
            className="border p-1 focus:outline-none focus:border-blue-500 bg-transparent resize-none whitespace-pre-wrap"
          />
        </div>
        <div className="flex items-center justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors"
          >
            {isLoading ? "수정중" : "수정하기"}
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

export default NoticeEdit;
