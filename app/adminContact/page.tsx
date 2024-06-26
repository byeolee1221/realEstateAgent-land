"use client";

import ShowContact from "@/components/adminContact/ShowContact";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface IDoc {
  id: string,
  title: string,
  content: string,
  createdAt: number,
  userName: string,
  userEmail: string,
  userImage: string
}

const AdminContact = () => {
  const router = useRouter();
  let docCount: number = 0;

  const [doc, setDoc] = useState<IDoc[]>();

  useEffect(() => {
    const getContactDoc = async () => {
      try {
        const response = await axios.get("/api/contact");

        if (response.status === 200) {
          setDoc(response.data);
        }
      } catch (error: any) {
        // 비로그인유저, 관리자 아닌 유저 접속시 메인페이지로 이동
        if (error.response.status === 401 || error.response.status === 403) {
          router.push("/");
        }
        console.log("userList GET에서 오류 발생", error);
        return toast("오류 발생", {
          description: error.response.data,
        });
      }
    };

    getContactDoc();
  }, []);

  if (doc) {
    docCount = doc.length;
  }

  return (
    // tabs 넣어서 접수된 개선사항 및 불편사항 메뉴 추가 예정
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm px-5">
        <Image src="/memo.png" alt="메모" width={30} height={30} />
        <h2 className="text-lg font-semibold">접수된 문의사항</h2>
      </div>
      <div className="flex flex-col space-y-2">
        <h2>
          현재까지 총 <span className="font-bold">{docCount}</span>건의 문의사항이
          접수되었습니다.
        </h2>
      </div>
      {doc?.map((data) => (
        <div key={data.id} className="flex flex-col space-y-1 w-full bg-slate-100 rounded-md p-2 shadow-md">
          <div className="flex space-x-2 items-center">
            {data.userImage ? (
              <img
                src={data.userImage}
                alt="프로필"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <Image
                src={"/user.png"}
                alt="프로필"
                width={40}
                height={40}
                className="bg-slate-300 rounded-full p-1"
              />
            )}
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold">{data.userName}</h2>
              <h2 className="text-xs">{data.userEmail}</h2>
            </div>
          </div>
          <div className="flex justify-between items-center w-full border-b border-slate-300 py-1">
            <h2 className="truncate">제목: {data.title}</h2>
            <ShowContact contactId={data.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminContact;
