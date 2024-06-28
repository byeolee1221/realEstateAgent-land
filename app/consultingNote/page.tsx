"use client";

import NoteTable from "@/components/consultingNote/NoteTable";
import NavBar from "@/components/navBar/NavBar";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ConsultingNote = () => {
  const { data: session } = useSession();
  const [freeUse, setFreeUse] = useState(1);

  useEffect(() => {
    const getCount = async () => {
      try {
        const response = await axios.get("/api/consultingNote/noteCount");

        if (response.status === 200) {
          console.log(+response.data)
          setFreeUse(+response.data);
        }
      } catch (error: any) {
        console.error("상담노트 getCount에서 오류 발생", error);
        return toast("오류 발생", {
          description: error.response.data,
        });
      }
    }
    getCount();
  }, [])

  return (
    <NavBar>
      <div className="px-4 flex flex-col space-y-6">
        <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm">
          <Image src="/memo.png" alt="메모" width={30} height={30} />
          {session ? (
            <div className="flex flex-col">
              <h2 className="text-lg">
                <span className="font-semibold">{session.user?.name}</span>
                님의 상담노트 목록
              </h2>
              <p className="text-xs">무료사용가능 횟수: {freeUse}회</p>
            </div>
          ) : (
            <h2 className="text-lg">상담노트 목록</h2>
          )}
        </div>
        <NoteTable />
      </div>
    </NavBar>
  );
};

export default ConsultingNote;
