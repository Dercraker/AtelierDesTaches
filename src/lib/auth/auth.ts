import { env } from "@/lib/env/server";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { setupResendCustomer } from "./authConfigSetup";
import {
  credentialsOverrideJwt,
  credentialsSignInCallback,
} from "./credentials-provider";
import { getNextAuthConfigProviders } from "./getNextAuthConfigProviders";

export const { handlers, auth: baseAuth } = NextAuth((req) => ({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/",
  },
  adapter: PrismaAdapter(prisma),
  providers: getNextAuthConfigProviders(),
  session: {
    strategy: "database",
  },
  secret: env.AUTH_SECRET,
  callbacks: {
    session: (params) => {
      // @ts-expect-error - NextAuth doesn't know about this property
      params.session.user.passwordHash = null;
      return params.session;
    },
  },
  events: {
    signIn: credentialsSignInCallback(req),
    createUser: async (message) => {
      const user = message.user;

      if (!user.email) {
        return;
      }

      const resendContactId = await setupResendCustomer(user);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resendContactId,
        },
      });
    },
  },
  jwt: credentialsOverrideJwt,
}));
