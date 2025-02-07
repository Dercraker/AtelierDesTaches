import { prisma } from "@/lib/prisma";
import { TodoModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type UpdateTodoQueryProps = {
  where: Prisma.TodoWhereUniqueInput;

  data: Prisma.TodoUpdateInput;
};

export const UpdateTodoQuery = async ({
  data,
  where,
}: UpdateTodoQueryProps) => {
  const todo = await prisma.todo.update({
    where: {
      deletedAt: null,
      ...where,
    },
    data: {
      ...data,
    },
  });

  return TodoModel.parse(todo);
};
