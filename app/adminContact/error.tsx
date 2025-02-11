"use client";

import Image from "next/image";

const AdminContactError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-white">
      <div className="mt-96 flex w-full flex-col items-center justify-center space-y-5">
        <div className="flex flex-col items-center space-y-3 pc:flex-row pc:space-x-3">
          <Image src="/image/error.png" alt="에러 아이콘" width={60} height={60} />
          <div className="flex flex-col space-y-1 text-center pc:text-start">
            <h1 className="text-xl font-bold tracking-tighter pc:text-2xl">
              {error.message}
            </h1>
            <p className="text-lg pc:text-2lg">아래 버튼을 눌러 새로고침해주세요!</p>
          </div>
        </div>
        <button
          onClick={() => reset()}
          className="rounded-md bg-orange-300 px-5 py-2 text-center text-2lg text-white transition-colors hover:bg-orange-500"
        >
          새로고침
        </button>
      </div>
    </div>
  );
};

export default AdminContactError;
