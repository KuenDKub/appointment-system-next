import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: "ADMIN" | "STAFF" | "CUSTOMER";
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "STAFF" | "CUSTOMER";
  }
}
