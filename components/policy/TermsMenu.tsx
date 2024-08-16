"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TermsMenu = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="mt-10 xl:mt-16 flex flex-col">
        <h1 className="text-2xl font-bold">LEGAL</h1>
        <p className="text-sm text-gray-500">마지막 업데이트: 2024.08.08</p>
      </div>
      <div className="flex items-center space-x-10 border-b dark:border-slate-900 pb-2">
        <Link
          href="/useTerms"
          className={clsx(
            "font-semibold text-sm",
            pathname === "/useTerms" ? "text-blue-500" : ""
          )}
        >
          서비스 이용약관
        </Link>
        <Link
          href="/privacyTerms"
          className={clsx(
            "font-semibold text-sm",
            pathname === "/privacyTerms" ? "text-blue-500" : ""
          )}
        >
          개인정보처리방침
        </Link>
        <Link
          href="/paidServiceTerms"
          className={clsx(
            "font-semibold text-sm",
            pathname === "/paidServiceTerms" ? "text-blue-500" : ""
          )}
        >
          유료서비스 이용약관
        </Link>
      </div>
    </>
  )
}

export default TermsMenu;