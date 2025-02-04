import { SiteConfig } from "@/SiteConfig";
// import MagicLinkMail from "@email/magic-link-email.email";
import { env } from "@/lib/env/server";
import type { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import ResendProvider from "next-auth/providers/resend";
// import { sendEmail } from "@/lib/mail/sendEmail";
import { logger } from "@/lib/logger";
import { sendEmail } from "@/lib/mail/sendEmail";
import { getCredentialsProvider } from "./credentials-provider";

type Providers = NonNullable<NextAuthConfig["providers"]>;

export const getNextAuthConfigProviders = (): Providers => {
  const providers: Providers = [
    ResendProvider({
      apiKey: env.RESEND_API_KEY,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const result = await sendEmail({
          to: email,
          subject: `Sign in to ${SiteConfig.domain}`,
          //TODO: MargicLink Mail
          // react: MagicLinkMail({
          //   url,
          // }),
        });
        if (result.error) {
          logger.error("Auth Resend Provider Error", result.error);
          throw new Error(`Failed to send email: ${result.error}`);
        }
      },
    }),
  ];

  if (env.AUTH_GITHUB_ID && env.AUTH_GITHUB_SECRET) {
    providers.push(
      GitHubProvider({
        clientId: env.AUTH_GITHUB_ID,
        clientSecret: env.AUTH_GITHUB_SECRET,
        allowDangerousEmailAccountLinking: true,
      })
    );
  }

  if (env.AUTH_GOOGLE_ID && env.AUTH_GOOGLE_SECRET) {
    providers.push(
      GoogleProvider({
        clientId: env.AUTH_GOOGLE_ID,
        clientSecret: env.AUTH_GOOGLE_SECRET,
      })
    );
  }

  if (SiteConfig.features.enablePasswordAuth) {
    providers.push(getCredentialsProvider());
  }

  return providers;
};
