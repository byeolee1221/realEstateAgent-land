import {
  ChatBubbleLeftEllipsisIcon,
  ChevronRightIcon,
  CreditCardIcon,
  InformationCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminMenu = () => {
  const { data: session } = useSession();
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    if (session) {
      const getUserRole = async () => {
        try {
          const response = await axios.get("/api/setting");

          if (response.status === 200) {
            setAdmin(response.data);
          }
        } catch (error) {
          console.error("setting GET에서 오류 발생", error);
        }
      };

      getUserRole();
    }
  }, []);

  return (
    <>
      {isAdmin ? (
        <div className="bg-slate-100 flex flex-col rounded-md px-4 py-5 space-y-3 text-sm shadow-sm">
          <h2 className="font-semibold text-sm">관리자 메뉴</h2>
          <div className="flex items-center justify-between border-b pb-2 w-full">
            <Link href="/userManage" className="flex items-center space-x-2 w-full">
              <UsersIcon className="w-5 h-5" />
              <span>가입한 회원관리</span>
            </Link>
            <ChevronRightIcon className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-between border-b pb-2 w-full">
            <Link href="/notice/write" className="flex items-center space-x-2 w-full">
              <InformationCircleIcon className="w-5 h-5" />
              <span>공지사항 등록</span>
            </Link>
            <ChevronRightIcon className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-between border-b pb-2 w-full">
            <Link href="/adminContact" className="flex items-center space-x-2 w-full">
              <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
              <span>문의사항 확인</span>
            </Link>
            <ChevronRightIcon className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-between pb-2 w-full">
            <Link href="/subscriptionManage" className="flex items-center space-x-2 w-full">
              <CreditCardIcon className="w-5 h-5" />
              <span>회원 구독관리</span>
            </Link>
            <ChevronRightIcon className="w-6 h-6" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AdminMenu;
