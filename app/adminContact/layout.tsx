import NavBar from "@/components/navBar/NavBar";

const AdminContactLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/contact.webp')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
            문의사항 확인
          </h1>
          <p>Contact check</p>
        </div>
        {children}
      </div>
    </NavBar>
  );
};

export default AdminContactLayout;
