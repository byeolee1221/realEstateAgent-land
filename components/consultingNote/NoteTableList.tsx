import { Session } from "next-auth";
import SignInBtn from "../SignInBtn";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Link from "next/link";

interface INoteList {
  customerName: string;
  purposeUse: string;
  kind: string;
  transactionType: string;
  date: string;
  id: string;
}

interface NoteTableListProps {
  isLoading: boolean;
  note: INoteList[];
  error: string;
  session: Session | null;
}

const NoteTableList = ({ isLoading, note, error, session }: NoteTableListProps) => {
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center text-sm p-2">
        <p>로그인이 필요한 서비스입니다.</p>
        <p>아래 버튼을 눌러 로그인해주세요.</p>
        <SignInBtn />
      </div>
    );
  }

  if (isLoading) {
    return <Skeleton className="w-full h-56 bg-slate-100" />;
  }

  return (
    <>
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
              <TableCell>{i + 1}</TableCell>
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
      {error && <h2 className="text-center p-2">{error}</h2>}
    </>
  );
};

export default NoteTableList;
