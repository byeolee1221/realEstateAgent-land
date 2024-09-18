"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import TopMenu from "./TopMenu";
import { Cog6ToothIcon, HomeIcon, PencilIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import TopMenuDesktop from "./TopMenuDesktop";
import { useAtom } from "jotai";
import { widthAtom } from "@/lib/atomState";

interface INavBar {
  children: React.ReactNode;
}

const NavBar = ({ children }: INavBar) => {
  const pathname = usePathname();

  const [width, setWidth] = useAtom(widthAtom);
  const isDesktop = width >= 1280;

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (window.scrollY > 0) {
        navbar?.classList.add("lg:shadow-xl");
      } else {
        navbar?.classList.remove("lg:shadow-xl");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    setWidth(window.innerWidth);

    return () => window.removeEventListener("resize", handleResize);
  }, [setWidth]);

  const NavLinkArr = [
    { href: "/consultingNote", icon: PencilSquareIcon, title: "상담노트" },
    { href: "/consultingMemo", icon: PencilIcon, title: "상담메모" },
    { href: "/setting", icon: Cog6ToothIcon, title: "설정" },
  ];

  return (
    <div className="flex flex-col w-full">
      <div
        id="navbar"
        className="flex items-center justify-between w-full px-5 py-4 z-20 top-0 fixed bg-white transition-all duration-300 lg:w-[70%] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:rounded-xl lg:px-10 lg:py-8 lg:mt-4"
      >
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/icon.png" alt="로고" width={30} height={30} />
          <h1 className="text-xl font-bold">중개랜드</h1>
        </Link>
        {!isDesktop ? <TopMenu /> : <TopMenuDesktop isDesktop={isDesktop} />}
      </div>
      <div className="mb-24 lg:mt-36 lg:w-[70%] lg:m-auto">{children}</div>
      {!isDesktop && (
        <nav className="border-t bottom-0 py-5 flex justify-around items-center w-full fixed z-20 bg-white">
          <Link href="/" className="flex flex-col items-center">
            <HomeIcon className={cn("w-6 h-6", pathname === "/" ? "text-blue-500" : "")} />
            <span className={cn("text-xs", pathname === "/" ? "text-blue-500" : "")}>홈</span>
          </Link>
          {NavLinkArr.map((nav, i) => (
            <Link key={i} href={nav.href} className="flex flex-col items-center">
              <nav.icon
                className={cn("w-6 h-6", pathname.includes(nav.href) ? "text-blue-500" : "")}
              />
              <span className={cn("text-xs", pathname.includes(nav.href) ? "text-blue-500" : "")}>
                {nav.title}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default NavBar;
