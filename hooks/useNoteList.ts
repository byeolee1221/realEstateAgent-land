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

export const useNoteList = (session: Session | null) => {
  const [note, setNote] = useState<INoteList[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;

    // 상담노트 리스트 가져오기
    const getNoteList = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/consultingNote/noteList");

        if (response.status === 200) {
          setNote(response.data);
        }
      } catch (error) {
        console.error("consultingNote noteTable GET에서 오류 발생", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        }
      } finally {
        setLoading(false);
      }
    }

    getNoteList();
  }, [session]);

  return { note, error, isLoading };
};
