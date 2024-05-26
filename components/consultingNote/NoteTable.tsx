import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface INoteList {
  customerName: string,
  purposeUse: string,
  kind: string,
  transactionType: string,
  date: string,
  id: string
}

const NoteTable = () => {
  const alertArr = [
    "무료체험은 계정당 1회에 한정됩니다.",
    "무료버전 노트는 계속 업데이트가 가능합니다.",
    "삭제는 각 노트의 세부페이지에서 가능합니다.",
    "노트는 본인외에는 확인할 수 없습니다.",
  ];

  const { data: session } = useSession();
  const [note, setNote] = useState<INoteList[]>([]);
  const [error, setError] = useState("");
  // console.log(note);
  useEffect(() => {
    const getNoteList = async () => {
      try {
        const response = await axios.get("/api/consultingNote/noteList");

        if (response.status === 200) {
          setNote(response.data);
        }
      } catch (error: any) {
        console.log("consultingNote noteTable GET에서 오류 발생", error);
        setError(error.response.data);
      }
    }
    getNoteList();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div className="border rounded-sm">
        {session ? (
          <Table>
            <TableHeader>
              <TableRow className="text-sm tracking-tighter">
                <TableHead>번호</TableHead>
                <TableHead>요약정보</TableHead>
                <TableHead className="text-right">업데이트일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {note.map((data, i) => (
                <TableRow key={data.id}>
                  <TableCell>{i+1}</TableCell>
                  <Link href={`/consultingNote/${data.id}`} legacyBehavior={true}>
                    <TableCell className="tracking-tighter cursor-pointer">
                      {data.customerName} / {data.purposeUse} / {data.kind} {data.transactionType}
                    </TableCell>
                  </Link>
                  <TableCell className="text-right">{data.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-sm p-2">
            <p>로그인이 필요한 서비스입니다.</p>
            <p>상단의 메뉴바를 눌러 로그인해주세요.</p>
          </div>
        )}
        {error !== "" ? <h2 className="text-center p-2">{error}</h2> : null}
      </div>
      {session && (
        <div className="flex justify-end">
          <Link
            href="/consultingNote/write"
            className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md text-white w-1/3 text-center"
          >
            노트 만들기
          </Link>
        </div>
      )}
      <div className="flex flex-col space-y-2 bg-blue-100 px-4 py-5 rounded-lg">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold">사용 전 확인해주세요!</h1>
        </div>
        {alertArr.map((item, i) => (
          <div key={i} className="flex items-center space-x-2 ml-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteTable;
