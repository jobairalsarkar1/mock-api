import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      role?: "ADMIN" | "HELPER" | "CLIENT"
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: "ADMIN" | "HELPER" | "CLIENT"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "HELPER" | "CLIENT"
  }
}
