import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../database";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
    verifyRequest: "/auth",
    newUser: "/app",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    GitHub,
    Google,
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
});
