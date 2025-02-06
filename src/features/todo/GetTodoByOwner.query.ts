import { prisma } from "@/lib/prisma";
import { TodoModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type GetTodoByOwnerQueryProps = {
  ownerId: string;
  where: Prisma.TodoWhereUniqueInput;
};

export const GetTodoByOwnerQuery = async ({
  where,
  ownerId,
}: GetTodoByOwnerQueryProps) => {
  const todo = await prisma.todo.findUnique({
    where: {
      ...where,
      ownerId,
    },
  });

  return TodoModel.parse(todo);
};
