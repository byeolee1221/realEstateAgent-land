import NavBar from "@/components/navBar/NavBar";

const NoticeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/notice.jpg')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
            공지사항
          </h1>
          <p>Notice</p>
        </div>
        {children}
      </div>
    </NavBar>
  );
};

export default NoticeLayout;
