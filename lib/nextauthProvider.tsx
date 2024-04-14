"use client"

import { SessionProvider } from "next-auth/react";

type props = {
  children: React.ReactNode;
};

export const NextAuthProvider = ({ children }: props) => {
  return <SessionProvider>{children}</SessionProvider>
}