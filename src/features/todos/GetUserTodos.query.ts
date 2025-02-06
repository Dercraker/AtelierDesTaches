import { prisma } from "@/lib/prisma";
import { TodoModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

type GetUserTodosQueryProps = {
  where: Prisma.TodoWhereInput;
  cursor?: Prisma.TodoWhereUniqueInput;
  take?: number;
};

export const GetUserTodosQuery = async ({
  cursor,
  take,
  where,
}: GetUserTodosQueryProps) => {
  const todos = await prisma.todo.findMany({
    where: {
      deletedAt: null,
      ...where,
    },
    take,
    cursor,
  });

  return z.array(TodoModel).parse(todos);
};
