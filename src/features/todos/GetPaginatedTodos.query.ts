import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

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
      state: "PUBLIC",
      ...where,
    },
    ...(cursor ? { skip: 1 } : {}),
    cursor,
    take,
    include: {
      members: true,
      tasks: false,
    },
  });

  return todos;
};
