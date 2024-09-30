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
import { useEffect, useState } from "react";
import axios from "axios";

interface INoticeTable {
  title: string,
  id: string,
  createdAt: number
}

const NoticeTable = () => {
  const [notice, setNotice] = useState<INoticeTable[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    const getNoticeList = async () => {
      try {
        const response = await axios.get("/api/notice/noticeList");

        if (response.status === 200) {
          setNotice(response.data);
        }
      } catch (error) {
        console.error("notice noticeTable GET에서 API 오류 발생", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        } 
      }
    }

    getNoticeList();
  }, [])

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
            {notice?.map((data, i) => (
              <TableRow key={data.id}>
                <TableCell>{i + 1}</TableCell>
                <Link href={`/notice/${data.id}`} legacyBehavior={true}>
                  <TableCell className="tracking-tighter cursor-pointer">
                    {data.title}
                  </TableCell>
                </Link>
                <TableCell className="text-right">{data.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {error !== "" ? <h2 className="text-center p-2">{error}</h2> : null}
    </div>
  );
};

export default NoticeTable;
