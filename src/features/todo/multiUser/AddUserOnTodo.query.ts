import { prisma } from "@/lib/prisma";
import { TodoModel } from "@/types/prisma";
import type { Prisma, TodoMembershipRole } from "@prisma/client";

type AddUserOnTodoQueryProps = {
  where: Prisma.TodoWhereUniqueInput;
  userId: string;
  roles?: TodoMembershipRole[];
};

export const AddUserOnTodoQuery = async ({
  userId,
  roles = ["MEMBER"],
  where,
}: AddUserOnTodoQueryProps) => {
  const todo = await prisma.todo.update({
    where: {
      deletedAt: null,
      ...where,
      members: {
        none: {
          userId,
        },
      },
    },
    data: {
      members: {
        create: {
          roles,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      },
    },
  });

  return TodoModel.parse(todo);
};
