import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type DeleteTodoQueryProps = {
  where: Prisma.TodoWhereUniqueInput;
};

export const DeleteTodoQuery = async ({ where }: DeleteTodoQueryProps) => {
  await prisma.todo.update({
    where: {
      deletedAt: null,
      ...where,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};
