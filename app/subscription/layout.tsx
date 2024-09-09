"use client"

import { RecoilRoot } from "recoil";
import NavBar from "@/components/navBar/NavBar";

const SubscriptionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <NavBar>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col items-center justify-center bg-[url('/subscription.webp')] h-60 bg-center bg-cover">
            <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
              구독 안내
            </h1>
            <p>Subscription</p>
          </div>
          {children}
        </div>
      </NavBar>
    </RecoilRoot>
  );
};

export default SubscriptionLayout;
