import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import axios from "axios";

interface IProps {
  contactId: string;
}

interface IDoc {
  title: string;
  content: string;
  createdAt: number;
}

const ShowContact = (props: IProps) => {
  const [doc, setDoc] = useState<IDoc>();
  const [error, setError] = useState("");

  useEffect(() => {
    const getContactDoc = async () => {
      try {
        const response = await axios.get(
          `/api/contact/contactRead?id=${props.contactId}`
        );

        if (response.status === 200) {
          setDoc(response.data);
        }
      } catch (error: any) {
        console.log("showContact GET에서 오류 발생", error);
        setError(error.response.data);
      }
    };

    getContactDoc();
  }, []);

  const contactArr = [
    { title: "제목", content: doc?.title },
    { title: "접수일", content: doc?.createdAt },
    { title: "문의내용", content: doc?.content },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-colors">
          문의사항 보기
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-start">문의사항</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-6">
          {contactArr.map((data, i) => (
            <div key={i} className="flex flex-col space-y-3 text-sm">
              <h2 className="text-xs text-gray-500">{data.title}</h2>
              <span className="border-b pb-1 whitespace-pre-wrap">
                {data.content}
              </span>
            </div>
          ))}
        </div>
        <DialogFooter className="flex items-center flex-row space-x-2 justify-end">
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors w-1/3">
            삭제
          </button>
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

export default ShowContact;
