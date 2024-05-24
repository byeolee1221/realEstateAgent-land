"use client";

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

const NoticeTable = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col space-y-4">
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="text-sm tracking-tighter">
              <TableHead>번호</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="text-right">게시일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((data, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <Link href="" legacyBehavior={true}>
                  <TableCell className="tracking-tighter cursor-pointer">
                    공지사항 테스트
                  </TableCell>
                </Link>
                <TableCell className="text-right">2024-05-24</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default NoticeTable;
