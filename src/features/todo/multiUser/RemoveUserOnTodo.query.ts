import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type RemoveUserOnTodoQueryProps = {
  where: Prisma.TodoMembershipWhereUniqueInput;
};

export const RemoveUserOnTodoQuery = async ({
  where,
}: RemoveUserOnTodoQueryProps) => {
  await prisma.todoMembership.update({
    where: {
      todo: {
        deletedAt: null,
      },
      ...where,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};
