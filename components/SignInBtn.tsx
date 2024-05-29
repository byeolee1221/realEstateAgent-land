import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const SignInBtn = () => {
  const pathname = usePathname();
  const onSignIn = () => {
    signIn("google");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={clsx(
            "text-white px-3 py-1 rounded-md transition-colors mt-2",
            pathname.includes("/consultingMemo")
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          )}
        >
          로그인
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>중개랜드 로그인</DialogTitle>
          <DialogDescription>
            아래 방법으로 로그인할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={onSignIn}
            className="flex items-center justify-center space-x-2 rounded-md border-2 px-3 py-2 w-full"
          >
            <Image
              src="/g-logo.png"
              alt="구글"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span>구글로 로그인하기</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInBtn;
