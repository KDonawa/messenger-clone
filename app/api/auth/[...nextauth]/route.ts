import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        //TODO: test what happens when we can't successfully connect to the db
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // we can have a user with no pw if they signed up with an auth provider like google so we have an email but no pw
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id!,
        },
      };
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/",
    signOut: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Database strategy
// Pros: More secure, easier to manage and revoke sessions, supports refresh tokens and sliding sessions
// Cons: Requires an adapter and a database connection, more network requests, slower performance

// JWT strategy
// Pros: Faster performance, less network requests, no database required, stateless and scalable
// Cons: Less secure, harder to manage and revoke sessions, does not support refresh tokens or sliding sessions by default
