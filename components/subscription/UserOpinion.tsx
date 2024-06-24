import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserOpinionSchema } from "@/app/mySubscription/paymentCancel/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

const UserOpinion = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof UserOpinionSchema>>({
    resolver: zodResolver(UserOpinionSchema),
    defaultValues: {
      opinion: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
  const formError = form.formState.errors;

  const onSubmit = async (values: z.infer<typeof UserOpinionSchema>) => {
    try {
      const response = await axios.post("/api/userOpinion", {
        opinion: values.opinion
      });

      if (response.status === 200) {
        form.reset();
        alert("의견을 보내주셔서 감사합니다. 서비스 운영에 소중한 자료로 활용하겠습니다.");
        router.push("/");
      }
    } catch (error: any) {
      console.error("userOpinion POST에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md text-center transition-colors">
          메인으로 돌아가기
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg">
        <DialogHeader className="text-start">
          <DialogTitle className="font-bold">가시기 전에 잠깐!</DialogTitle>
          <DialogDescription>
            서비스 사용하시면서 불편하셨던 점이나 개선사항 있으시면 말씀해주세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3 text-sm">
          <label htmlFor="content" className="font-semibold">
            개선의견 또는 불편한 점
          </label>
          <textarea
            id="content"
            {...form.register("opinion")}
            rows={10}
            className="border p-1 focus:outline-none focus:border-green-500 bg-transparent resize-none whitespace-pre-wrap"
          />
          {formError ? <p className="text-red-500 text-sm">{formError.opinion?.message}</p> : null}
          <DialogFooter>
            <div className="flex items-center space-x-2 justify-end">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors"
              >
                {isLoading ? "보내는 중.." : "보내기"}
              </button>
              <DialogClose asChild>
                <button
                  onClick={() => router.push("/")}
                  className="border border-green-500 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md transition-colors"
                >
                  메인으로 돌아가기
                </button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserOpinion;
