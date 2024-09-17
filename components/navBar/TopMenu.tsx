"use client"

import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Link from "next/link";
import Contact from "./Contact";
import { Bars2Icon, CalculatorIcon } from "@heroicons/react/24/outline";

const TopMenu = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="lg:hidden">
          <Bars2Icon className="w-6 h-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>메뉴</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!session ? <SignIn /> : <SignOut />}
          <DropdownMenuItem>
            <Link href="/subscription" className="flex">
              <CalculatorIcon className="w-6 h-6 mr-2" />
              <span>구독 안내</span>
            </Link>
          </DropdownMenuItem>
          <Contact />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TopMenu;
