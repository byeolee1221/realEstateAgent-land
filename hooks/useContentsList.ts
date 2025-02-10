import axios from "axios";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

interface INoteList {
  customerName: string;
  purposeUse: string;
  kind: string;
  transactionType: string;
  date: string;
  id: string;
}

interface IMemoList {
  title: string;
  content: string;
  id: string;
  createdAt: number;
}

interface IUseContentsList { 
  session: Session | null;
  href: string;
  location: "note" | "memo";
}


export const useContentsList = ({ session, href, location }: IUseContentsList) => {
  const [note, setNote] = useState<INoteList[]>([]);
  const [memo, setMemo] = useState<IMemoList[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;

    // 상담노트 리스트 가져오기
    const getNoteList = async () => {
      try {
        setLoading(true);
        const response = await axios.get(href);

        if (response.status === 200) {
          if (location === "note") {
            setNote(response.data);
          } else {
            setMemo(response.data);
          }
        }
      } catch (error) {
        console.error(`consulting${location} noteTable GET에서 오류 발생`, error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        }
      } finally {
        setLoading(false);
      }
    }

    getNoteList();
  }, [session]);

  return { note, memo, error, isLoading };
};
