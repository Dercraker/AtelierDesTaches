import { prisma } from "@/lib/prisma";
import { TodoModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type GetTodoBySlugQueryProps = { where: Prisma.TodoWhereUniqueInput };

export const GetTodoBySlugQuery = async ({
  where,
}: GetTodoBySlugQueryProps) => {
  const todo = await prisma.todo.findUnique({
    where: {
      deletedAt: null,
      ...where,
    },
  });

  return TodoModel.parse(todo);
};
