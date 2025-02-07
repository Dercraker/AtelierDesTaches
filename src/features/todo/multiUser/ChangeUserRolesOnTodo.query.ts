import { prisma } from "@/lib/prisma";
import type { Prisma, TodoMembershipRole } from "@prisma/client";

type ChangeUserRolesOnTodoQueryProps = {
  where: Prisma.TodoMembershipWhereUniqueInput;
  roles: TodoMembershipRole[];
};

export const ChangeUserRolesOnTodoQuery = async ({
  roles,
  where,
}: ChangeUserRolesOnTodoQueryProps) => {
  await prisma.todoMembership.update({
    where: {
      deletedAt: null,
      ...where,
    },
    data: {
      roles,
    },
  });
};
