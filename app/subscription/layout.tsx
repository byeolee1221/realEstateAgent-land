"use client";

import NavBar from "@/components/navBar/NavBar";

const SubscriptionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBar>
      <div className="flex flex-col space-y-6 mt-10 lg:mt-0 lg:mb-10">
        <div className="flex flex-col items-center justify-center bg-[url('/subscription.webp')] h-60 bg-center bg-cover lg:rounded-md">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800 lg:text-3xl">
            구독 안내
          </h1>
          <p className="lg:text-lg">Subscription</p>
        </div>
        {children}
      </div>
    </NavBar>
  );
};

export default SubscriptionLayout;
