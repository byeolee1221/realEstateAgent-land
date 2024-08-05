import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TableCell } from "../ui/table";
import { memo, useEffect, useState } from "react";
import axios from "axios";

interface IProps {
  email: string;
  id: string;
  image: string;
  name: string;
}

interface ICount {
  note: number;
  memo: number;
}

const UserProfile = (props: IProps) => {
  const [count, setCount] = useState<ICount>();
  const [error, setError] = useState("");

  useEffect(() => {
    const getDocCount = async () => {
      try {
        const response = await axios.get(
          `/api/userManage/count?id=${props.id}`
        );

        if (response.status === 200) {
          setCount(response.data);
        }
      } catch (error) {
        console.error("userProfile GET에서 오류 발생", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        }
      }
    };

    getDocCount();
  }, []);

  const countArr = [
    { title: "작성한 노트 수", content: count?.note },
    { title: "작성한 메모 수", content: count?.memo },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableCell>{props.email}</TableCell>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>회원정보</DialogTitle>
        </DialogHeader>
        {!error ? <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-center space-y-2">
            {props.image ? (
              <>
                <img
                  src={`${props.image}`}
                  alt="유저프로필"
                  className="w-14 h-14 rounded-full"
                />
                <h1 className="font-semibold">{props.name}</h1>
              </>
            ) : (
              <>
                <Image
                  src="/user.png"
                  alt="프로필"
                  width={50}
                  height={50}
                  className="bg-slate-300 rounded-full p-2"
                />
                <h1 className="font-semibold">{props.name}</h1>
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            {countArr.map((data, i) => (
              <div
                key={i}
                className="flex flex-col space-y-1 bg-slate-100 rounded-md px-8 py-2 text-center shadow-sm"
              >
                <h2 className="font-semibold">{data.title}</h2>
                <span>{data.content}</span>
              </div>
            ))}
          </div>
        </div> : <p className="text-sm text-red-500 text-center">{error}</p>}
        <DialogFooter>
          <DialogClose asChild>
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors">
              닫기
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(UserProfile);
