import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { profiles } from "@/db/schema";
import { isAppRole } from "@/lib/auth/roles";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email =
          typeof credentials?.email === "string" ? credentials.email.trim().toLowerCase() : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password || !process.env.DATABASE_URL) {
          return null;
        }

        const profile = await getDb().query.profiles.findFirst({
          where: eq(profiles.email, email),
        });

        if (!profile?.passwordHash || !profile.isActive || !isAppRole(profile.role)) {
          return null;
        }

        const passwordMatches = await compare(password, profile.passwordHash);

        if (!passwordMatches) {
          return null;
        }

        await getDb()
          .update(profiles)
          .set({
            lastLoginAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(profiles.id, profile.id));

        return {
          id: profile.id,
          name: profile.fullName,
          email: profile.email,
          role: profile.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        const tokenRole = typeof token.role === "string" ? token.role : "";

        if (typeof token.id === "string") {
          session.user.id = token.id;
        }

        if (isAppRole(tokenRole)) {
          session.user.role = tokenRole;
        }
      }

      return session;
    },
  },
});
