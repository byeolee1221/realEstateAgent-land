import { NextAuthOptions } from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from "./firestore";
import Google from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = ({
  adapter: FirestoreAdapter(firestore) as Adapter,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  session: {
    strategy: "database",
    maxAge: 60 * 60,
    updateAge: 30 * 60
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl)
        return url;
      return baseUrl;
    },
  },
  secret: process.env.AUTH_SECRET,
})
  
