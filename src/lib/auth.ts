import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true, // Allow IP address access
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "อีเมล", type: "email" },
        password: { label: "รหัสผ่าน", type: "password" },
        username: { label: "ชื่อผู้ใช้", type: "text" },
      },
      async authorize(credentials) {
        if (
          (!credentials?.email && !credentials?.username) ||
          !credentials?.password
        ) {
          return null;
        }
        try {
          // Check if it's admin login (username) or customer login (email)
          if (credentials.username) {
            // Admin login
            const user = await prisma.user.findUnique({
              where: { username: credentials.username as string },
            });

            if (!user || user.role !== "ADMIN") {
              return null;
            }

            const isPasswordValid = await bcrypt.compare(
              credentials.password as string,
              user.password
            );

            if (!isPasswordValid) {
              return null;
            }

            return {
              id: user.id,
              email: user.email,
              username: user.username,
              role: user.role,
              firstName: "Admin",
              lastName: "User",
            };
          } else {
            // Customer login
            const user = await prisma.user.findUnique({
              where: { email: credentials.email as string },
            });

            if (!user || user.role !== "CUSTOMER") {
              return null;
            }

            const isPasswordValid = await bcrypt.compare(
              credentials.password as string,
              user.password
            );

            if (!isPasswordValid) {
              return null;
            }

            return {
              id: user.id,
              email: user.email,
              username: user.username,
              role: user.role,
              firstName: "Customer",
              lastName: "User",
            };
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role as "ADMIN" | "STAFF" | "CUSTOMER";
        (session.user as any).username = token.username;
        (session.user as any).firstName = token.firstName;
        (session.user as any).lastName = token.lastName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
