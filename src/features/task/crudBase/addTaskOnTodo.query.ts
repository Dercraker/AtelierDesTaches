import { prisma } from "@/lib/prisma";
import { TaskModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type AddTaskOnTodoQueryProps = { data: Prisma.TaskCreateInput };

export const AddTaskOnTodoQuery = async ({ data }: AddTaskOnTodoQueryProps) => {
  const task = await prisma.task.create({
    data: {
      status: "PENDING",
      ...data,
    },
  });

  return TaskModel.parse(task);
};
