"use client"

import UserList from "@/components/userManage/UserList";
import Image from "next/image";

const UserManage = () => {
  return (
    <div className="px-4 flex flex-col space-y-6">
      <div className="flex items-center space-x-2 bg-slate-100 w-fit p-2 rounded-md shadow-sm">
        <Image src="/userManageIcon.png" alt="유저" width={30} height={30} />
        <h2 className="text-lg font-semibold">가입한 회원관리</h2>
      </div>
      <UserList />
    </div>
  );
};

export default UserManage;
