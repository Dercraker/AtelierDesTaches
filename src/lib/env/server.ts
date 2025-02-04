import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.string().url(),

    // NextAuth
    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),

    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),

    AUTH_SECRET: z.string(),

    // Resend
    RESEND_API_KEY: z.string().min(1),
    RESEND_AUDIENCE_ID: z.string().optional(),
    RESEND_EMAIL_FROM: z.string().min(1),

    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  experimental__runtimeEnv: process.env,
});
