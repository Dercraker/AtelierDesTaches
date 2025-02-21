import { prisma } from "@/lib/prisma";
import { VerificationTokenModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";


type GetTokenInviteQueryProps = {
  where: Prisma.VerificationTokenWhereUniqueInput;
};

export const GetTokenInviteQuery = async ({ where }: GetTokenInviteQueryProps) => {
  const token = await prisma.verificationToken.findUnique({
    where: {
      ...where,
    },
  });

  return VerificationTokenModel.parse(token); 
};
