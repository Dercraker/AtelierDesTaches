import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type GetTodoMembershipQueryProps = {
  where: Prisma.TodoMembershipWhereInput;
  include?: Prisma.TodoMembershipInclude;
};

export const GetTodoMembershipsQuery = async ({
  where,
  include,
}: GetTodoMembershipQueryProps) => {
  const todoMembership = await prisma.todoMembership.findMany({
    where: {
      todo: {
        deletedAt: null,
      },
      ...where,
    },
    include: {
      ...include,
    },
  });

  return todoMembership;
};
