import NavBar from "@/components/navBar/NavBar";

const MySubscriptionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/subscription.jpg')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
            구독 관리
          </h1>
          <p>My Subscription</p>
        </div>
        {children}
      </div>
    </NavBar>
  );
};

export default MySubscriptionLayout;
