import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type CreateTokenInviteQueryProps = { data: Prisma.VerificationTokenCreateInput };

export const CreateTokenInviteQuery = async ({ data }: CreateTokenInviteQueryProps) => {
  const tokenInvite = await prisma.verificationToken.create({
    data: {
      ...data,
    },
  });

  return tokenInvite;
};
