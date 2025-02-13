import { prisma } from "@/lib/prisma";
import { RelatedTodoMembershipModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type GetTodoMembershipQueryProps = {
  where: Prisma.TodoMembershipWhereInput;
  include?: Prisma.TodoMembershipInclude;
};

export const GetTodoMembershipQuery = async ({
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

  return todoMembership.map((m) => RelatedTodoMembershipModel.parse(m));
};
