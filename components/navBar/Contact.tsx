import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { z } from "zod";
import { ContactSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Contact = () => {
  const { data: session } = useSession();
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      title: "",
      content: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof ContactSchema>) => {
    try {
      const response = await axios.post("/api/contact", {
        title: values.title,
        content: values.content
      });

      if (response.status === 200) {
        form.reset();
        alert("문의사항이 등록되었습니다. 감사합니다.");
      }
    } catch (error: any) {
      console.log("contact post에서 오류 발생", error);
      setError(error.response.data);
    }
  }

  useEffect(() => {
    if (!session) {
      setError("로그인이 필요한 서비스입니다.");
    }
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          <span>문의하기</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-start">문의사항 남기기</DialogTitle>
          <DialogDescription className="text-start">
            서비스에 관한 어떤 문의사항이든 남겨주시면 적극 검토해보겠습니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3 text-sm">
          <div className="flex flex-col space-y-1">
            <label htmlFor="title" className="text-xs text-gray-500">
              제목
            </label>
            <input
              {...form.register("title")}
              id="title"
              type="text"
              className="border-b pb-1 focus:outline-none focus:border-green-500 bg-transparent"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="content" className="text-xs text-gray-500">
              문의사항
            </label>
            <textarea
              {...form.register("content")}
              id="content"
              rows={10}
              className="border p-1 focus:outline-none focus:border-green-500 bg-transparent resize-none whitespace-pre-wrap"
            />
          </div>
          <DialogFooter>
            <div className="flex items-center justify-end space-x-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors"
              >
                {isLoading ? "발송중" : "게시하기"}
              </button>
              <DialogClose asChild>
                <button
                  type="button"
                  className="border border-green-500 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md transition-colors"
                >
                  취소
                </button>
              </DialogClose>
            </div>
            {error !== "" ? <p className="text-sm text-red-500">{error}</p> : null}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Contact;
