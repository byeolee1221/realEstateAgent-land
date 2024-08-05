"use client";

import ShowContact from "@/components/adminContact/ShowContact";
import ShowOpinion from "@/components/adminContact/ShowOpinion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface IDoc {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  userName: string;
  userEmail: string;
  userImage: string;
}

interface IOpinion {
  id: string;
  opinion: string;
  userEmail: string;
  userName: string;
  userImage: string;
  createdAt: number;
}

const AdminContact = () => {
  const router = useRouter();
  let docCount: number = 0;
  let opinionCount: number = 0;

  const [doc, setDoc] = useState<IDoc[]>();
  const [opinion, setOpinion] = useState<IOpinion[]>();

  // 문의사항 API 호출
  useEffect(() => {
    const getContactDoc = async () => {
      try {
        const response = await axios.get("/api/contact");

        if (response.status === 200) {
          setDoc(response.data);
        }
      } catch (error) {
        // 비로그인유저, 관리자 아닌 유저 접속시 메인페이지로 이동
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401 || error.response?.status === 403) {
            router.push("/");
          }
          console.error("adminContact 문의사항 GET에서 오류 발생", error);
          return toast("오류 발생", {
            description: error.response?.data,
          });
        }
      }
    };

    getContactDoc();
  }, []);

  // 개선의견 API 호출
  useEffect(() => {
    const getOpinionDoc = async () => {
      try {
        const response = await axios.get("/api/userOpinion");

        if (response.status === 200) {
          setOpinion(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("adminContact 개선사항 GET에서 오류 발생", error);
          return toast("오류 발생", {
            description: error.response?.data,
          });
        }
      }
    };

    getOpinionDoc();
  }, []);

  if (doc) {
    docCount = doc.length;
  }

  if (opinion) {
    opinionCount = opinion.length;
  }

  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm px-5">
        <Image src="/memo.png" alt="메모" width={30} height={30} />
        <h2 className="text-lg font-semibold">접수된 문의사항</h2>
      </div>
      <Tabs defaultValue="문의사항">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="문의사항">문의사항</TabsTrigger>
          <TabsTrigger value="개선의견">개선의견</TabsTrigger>
        </TabsList>
        <TabsContent value="문의사항" className="flex flex-col space-y-4">
          <h2 className="text-center">
            현재까지 총 <span className="font-bold">{docCount}</span>건의 문의사항이 접수되었습니다.
          </h2>
          {doc?.map((data) => (
            <div
              key={data.id}
              className="flex flex-col space-y-1 w-full bg-slate-100 rounded-md p-2 shadow-md"
            >
              <div className="flex space-x-2 items-center">
                {data.userImage ? (
                  <img src={data.userImage} alt="프로필" className="w-10 h-10 rounded-full" />
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
        </TabsContent>
        <TabsContent value="개선의견" className="flex flex-col space-y-4">
          <h2 className="text-center">
            현재까지 총 <span className="font-bold">{opinionCount}</span>건의 개선의견이 접수되었습니다.
          </h2>
          {opinion?.map((data) => (
            <div key={data.id} className="flex flex-col space-y-1 w-full bg-slate-100 rounded-md p-2 shadow-md">
              <div className="flex space-x-2 items-center">
                {data.userImage ? (
                  <img src={data.userImage} alt="프로필" className="w-10 h-10 rounded-full" />
                ) : (
                  <Image src={"/user.png"} alt="프로필" width={40} height={40} className="bg-slate-300 rounded-full p-1" />
                )}
                <div className="flex flex-col">
                  <h2 className="text-sm font-semibold">{data.userName}</h2>
                  <h2 className="text-xs">{data.userEmail}</h2>
                </div>
              </div>
              <div className="flex justify-between items-center w-full border-b border-slate-300 py-1">
                <h2 className="truncate">제목: 구독해지 후 개선의견</h2>
                <ShowOpinion opinionId={data.id} />
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContact;
