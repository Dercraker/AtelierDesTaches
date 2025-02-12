import { prisma } from "@/lib/prisma";
import { TodoModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

type GetPaginatedTodosProps = {
  where?: Prisma.TodoWhereInput;
  cursor?: Prisma.TodoWhereUniqueInput;
  take?: number;
};

export const GetPaginatedTodosQuery = async ({
  where,
  cursor,
  take = 9,
}: GetPaginatedTodosProps) => {
  const todos = await prisma.todo.findMany({
    where: {
      deletedAt: null,
      ...where,
    },
    ...(cursor ? { skip: 1 } : {}),
    cursor,
    take,
  });

  return z.array(TodoModel).parse(todos);
};
