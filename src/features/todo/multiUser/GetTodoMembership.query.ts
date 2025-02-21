import { prisma } from "@/lib/prisma";
import { TodoMembershipModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type GetTodoMembershipQueryProps = {
  where: Prisma.TodoMembershipWhereUniqueInput;
  select?: Prisma.TodoMembershipSelect;
  include?: Prisma.TodoMembershipInclude;
};

export const GetTodoMembershipQuery = async ({
  where,
  include,
  select,
}: GetTodoMembershipQueryProps) => {
  const membership = await prisma.todoMembership.findUnique({
    where: {
      deletedAt: null,
      ...where,
    },
    select: {
      ...select,
    },
    include: {
      ...include,
    },
  });

  return TodoMembershipModel.parse(membership);
};
