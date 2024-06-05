import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ContactSchema } from "./navBar/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const ContactContent = () => {
  const { data: session } = useSession();
  const [error, setError] = useState<String | null>(null);

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof ContactSchema>) => {
    try {
      const response = await axios.post("/api/contact", {
        title: values.title,
        content: values.content,
      });

      if (response.status === 200) {
        form.reset();
        alert("문의사항이 등록되었습니다. 감사합니다.");
      }
    } catch (error: any) {
      console.log("contact post에서 오류 발생", error);
      setError(error.response.data);
    }
  };

  useEffect(() => {
    if (!session) {
      setError("로그인이 필요한 서비스입니다.");
    } else {
      setError("");
    }
  }, [session]);

  return (
    <DialogContent className="w-[90%] rounded-xl">
      <DialogHeader>
        <DialogTitle className="text-start">문의사항 남기기</DialogTitle>
        <DialogDescription className="text-start">
          서비스에 관한 어떤 문의사항이든 남겨주시면 적극 검토해보겠습니다.
        </DialogDescription>
      </DialogHeader>
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
        {session ? (
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
          </DialogFooter>
        ) : null}
        {error !== null ? <p className="text-sm text-red-500">{error}</p> : null}
      </form>
    </DialogContent>
  );
};

export default ContactContent;
