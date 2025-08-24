import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { prisma } from "./lib/prisma"
import { verificationEmailTemplate } from "./lib/email-templates/verification-template"
import { generateApiKey } from "./lib/generateAPIKey"
import { JWT } from "next-auth/jwt"
import type { Session, User } from "next-auth";

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
        const { identifier: email, provider, url, request } = params;
        const host = new URL(url).host;

        let name = email.split("@")[0];

        if (request) {
          try {
            const body = await request.json();
            if (body.name) {
              name = body.name
            }
          } catch (error) {
            console.error("Failed to parse request body: ", error)
          }
        }

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${provider.apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: `PlaceAPI <${provider.from}>`,
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
              name,
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
    async jwt({ 
      token,
      user,
      trigger,
      session 
    }: { 
      token: JWT;
      user?: User;
      trigger?: string;
      session?: Session;
    }) {
      if (user) {
        let userFromDB = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (userFromDB && !userFromDB.apiKey) {
          const newKey = generateApiKey();
          userFromDB = await prisma.user.update({
            where: { id: user.id },
            data: { apiKey: newKey },
          });
        }

        
        token.role = userFromDB?.role || 'CLIENT';
        token.apiKey = userFromDB?.apiKey || '';
      }

      // On session update, fetch fresh data
      if (trigger === "update" && session?.apiKey) {
        token.apiKey = session.apiKey;
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.apiKey = token.apiKey;
      }
      return session
    },
  },

} satisfies NextAuthConfig
 
export const { handlers, signIn, signOut, auth } = NextAuth(config)

// work done.