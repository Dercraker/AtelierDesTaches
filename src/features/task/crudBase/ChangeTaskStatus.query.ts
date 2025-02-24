import { prisma } from "@/lib/prisma";
import { TaskModel } from "@/types/prisma";
import type { Prisma, TaskStatus } from "@prisma/client";

type ChangeTaskStatusQueryProps = {
  where: Prisma.TaskWhereUniqueInput;
  status: TaskStatus;
};

export const ChangeTaskStatusQuery = async ({
  status,
  where,
}: ChangeTaskStatusQueryProps) => {
  const task = await prisma.task.update({
    where: {
      deletedAt: null,
      ...where,
    },
    data: {
      status,
    },
  });

  return TaskModel.parse(task);
};
