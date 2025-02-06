import { prisma } from "@/lib/prisma";
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
      ...where,
    },
    data: {
      status,
    },
  });

  return todo;
};
