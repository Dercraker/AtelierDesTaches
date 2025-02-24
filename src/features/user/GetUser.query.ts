import { prisma } from "@/lib/prisma";
import { UserModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type GetUserQueryProps = {
  where: Prisma.UserWhereUniqueInput;
  select?: Prisma.UserSelect;
};

export const GetUserQuery = async ({ where, select }: GetUserQueryProps) => {
  const user = await prisma.user.findUnique({
    where: {
      deletedAt: null,
      ...where,
    },
    select: {
      ...select,
    },
  });

  return UserModel.parse(user);
};
