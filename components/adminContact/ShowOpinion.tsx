import axios from "axios";
import { memo, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import OpinionDelete from "./OpinionDelete";

interface IProps {
  opinionId: string;
}

interface IOpinion {
  id: string;
  opinion: string;
  createdAt: number;
}

const ShowOpinion = (props: IProps) => {
  const [opinion, setOpinion] = useState<IOpinion>();
  const [error, setError] = useState("");

  useEffect(() => {
    const getOpinionDoc = async () => {
      try {
        const response = await axios.get(`/api/userOpinion/opinionRead?id=${props.opinionId}`);

        if (response.status === 200) {
          setOpinion(response.data);
        }
      } catch (error) {
        console.error("showOpinion GET에서 오류 발생", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        }
      }
    };

    getOpinionDoc();
  }, []);

  const opinionArr = [
    { title: "제목", content: "구독해지 후 개선의견" },
    { title: "접수일", content: opinion?.createdAt },
    { title: "문의내용", content: opinion?.opinion },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-colors">
          개선의견 보기
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-start">개선의견</DialogTitle>
        </DialogHeader>
        {!error ? (
          <div className="flex flex-col space-y-6">
            {opinionArr.map((data, i) => (
              <div key={i} className="flex flex-col space-y-3 text-sm">
                <h2 className="text-xs text-gray-500">{data.title}</h2>
                <span className="border-b pb-1 whitespace-pre-wrap">{data.content}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <DialogFooter className="flex items-center flex-row space-x-2 justify-end">
          {!error && <OpinionDelete id={opinion?.id!} />}
          <DialogClose asChild>
            <button className="border border-green-500 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md transition-colors w-1/3">
              닫기
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ShowOpinion);
