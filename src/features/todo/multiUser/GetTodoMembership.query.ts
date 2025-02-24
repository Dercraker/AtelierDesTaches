import { prisma } from "@/lib/prisma";
import { TodoMembershipModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type GetTodoMembershipQueryProps = {
  where: Prisma.TodoMembershipWhereUniqueInput;
};

export const GetTodoMembershipQuery = async ({
  where,
}: GetTodoMembershipQueryProps) => {
  const membership = await prisma.todoMembership.findUnique({
    where: {
      deletedAt: null,
      ...where,
    },
  });
  const { success, data } = TodoMembershipModel.safeParse(membership);
  return success ? data : null;
};
