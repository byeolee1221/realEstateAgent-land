"use client"

import { useSession } from "next-auth/react";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Link from "next/link";
import Contact from "./Contact";
import SiteMenuDesktop from "./SiteMenuDesktop";

interface IProps {
  isDesktop: boolean;
}

const TopMenuDesktop = ({ isDesktop }: IProps) => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center space-x-14">
      {!session ? <SignIn isDesktop={isDesktop} /> : <SignOut isDesktop={isDesktop} />}
      <Link href="/subscription" className="text-lg font-bold">구독 안내</Link>
      <Contact isDesktop={isDesktop} />
      <SiteMenuDesktop />
    </div>
  )
}

export default TopMenuDesktop;