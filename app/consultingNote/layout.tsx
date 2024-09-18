"use client";

import NavBar from "@/components/navBar/NavBar";

const ConsultingNoteManageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBar>
      <div className="flex flex-col space-y-6 mt-10 lg:mt-0 lg:mb-10">
        <div className="flex flex-col items-center justify-center bg-[url('/contract.webp')] h-60 bg-center bg-cover lg:rounded-md">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800 lg:text-3xl">
            상담노트
          </h1>
          <p className="lg:text-lg">My consulting note</p>
        </div>
        {children}
      </div>
    </NavBar>
  );
};

export default ConsultingNoteManageLayout;
