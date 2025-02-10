import { Session } from "next-auth";
import SignInBtn from "../SignInBtn";
import { Skeleton } from "../ui/skeleton";
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import Link from "next/link";

interface IMemoList {
  title: string;
  content: string;
  id: string;
  createdAt: number;
}

interface MemoTableListProps {
  session: Session | null;
  isLoading: boolean;
  memo: IMemoList[];
  error: string;
}

const MemoTableList = ({ session, isLoading, memo, error }: MemoTableListProps) => {
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
            <TableHead>제목</TableHead>
            <TableHead className="text-right">업데이트일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memo.map((data, i) => (
            <TableRow key={data.id}>
              <TableCell>{i + 1}</TableCell>
              <Link href={`/consultingMemo/${data.id}`} legacyBehavior={true}>
                <TableCell className="tracking-tighter cursor-pointer">{data.title}</TableCell>
              </Link>
              <TableCell className="text-right">{data.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && <h2 className="text-center p-2">{error}</h2>}
    </>
  );
};

export default MemoTableList;
