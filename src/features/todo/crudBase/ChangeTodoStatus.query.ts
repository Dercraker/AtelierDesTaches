import { prisma } from "@/lib/prisma";
import { TodoModel } from "@/types/prisma";
import type { Prisma, Status } from "@prisma/client";

type ChangeTodoStatusQueryProps = {
  where: Prisma.TodoWhereUniqueInput;
  status: Status;
};

export const ChangeTodoStatusQuery = async ({
  status,
  where,
}: ChangeTodoStatusQueryProps) => {
  const todo = await prisma.todo.update({
    where: {
      deletedAt: null,
      ...where,
    },
    data: {
      status,
    },
  });

  return TodoModel.parse(todo);
};
