import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthConfig, User } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { prisma } from "./lib/prisma"
import { JWT } from "next-auth/jwt"
import { verificationEmailTemplate } from "./lib/email-templates/verification-template"

export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: 'no-reply@jobairalsarkar.site',
      normalizeIdentifier(identifier: string) {
        return identifier.toLowerCase().trim()
      },
      async sendVerificationRequest(params) {
        const { identifier: email, provider, url } = params;
        const host = new URL(url).host;
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${provider.apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: provider.from,
              to: email,
              subject: `Your Magic Link to ${host}`,
              html: verificationEmailTemplate(url, host),
              text: `Sign in to ${host}\n\nClick this link to sign in: ${url}\n\nThis link will expire in 24 hours.`,
            }),
          });

          if (!res.ok) {
            const error = await res.text();
            console.error("Resend API error:", error);
            throw new Error(`Failed to send verification email: ${res.status} ${res.statusText}`);
          }

          await prisma.user.upsert({
            where: { email },
            create: {
              email,
              name: email.split("@")[0],
              role: "CLIENT",
            },
            update: {},
          });
        } catch (error) {
          console.error("Email sending error:", error);
          throw new Error("Failed to send verification email. Please try again later.");
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }: {token: JWT, user?: User}) {
      if (user) {
        token.role = user.role || 'CLIENT'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    },
  },

} satisfies NextAuthConfig
 
export const { handlers, signIn, signOut, auth } = NextAuth(config)

// work done.