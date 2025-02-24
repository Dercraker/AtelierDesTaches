import { prisma } from "@/lib/prisma";
import { TodoModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type CreateTodoQueryProps = { data: Prisma.TodoCreateInput };

export const CreateTodoQuery = async ({ data }: CreateTodoQueryProps) => {
  const todo = await prisma.todo.create({
    data: {
      ...data,
    },
  });

  return TodoModel.parse(todo);
};
