import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const MemoTable = () => {
  const alertArr = [
    "무료체험은 계정당 5회에 한정됩니다.",
    "무료버전 메모는 계속 업데이트가 가능합니다.",
    "삭제는 각 메모의 세부페이지에서 가능합니다.",
    "메모는 본인외에는 확인할 수 없습니다.",
  ];

  return (
    <div className="flex flex-col space-y-4">
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="text-sm tracking-tighter">
              <TableHead>번호</TableHead>
              <TableHead>요약정보</TableHead>
              <TableHead className="text-right">업데이트일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((data) => (
              <TableRow key={data}>
                <TableCell>{data}</TableCell>
                <Link href="" legacyBehavior={true}>
                  <TableCell className="tracking-tighter cursor-pointer">
                    홍길동: 청년 전세대출 연계
                  </TableCell>
                </Link>
                <TableCell className="text-right">2024.04.19</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <Link
          href="/consultingMemo/write"
          className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-white w-1/3 text-center"
        >
          메모 만들기
        </Link>
      </div>
      <div className="flex flex-col space-y-2 bg-green-100 px-4 py-5 rounded-lg">
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
              className="w-5 h-5 text-green-500"
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

export default MemoTable;
