import { prisma } from "@/lib/prisma";
import { TaskModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type UpdateTaskQueryProps = {
  where: Prisma.TaskWhereUniqueInput;
  data: Prisma.TaskUpdateInput;
};

export const UpdateTaskQuery = async ({
  where,
  data,
}: UpdateTaskQueryProps) => {
  const task = await prisma.task.update({
    where: {
      deletedAt: null,
      ...where,
    },
    data: {
      ...data,
    },
  });

  return TaskModel.parse(task);
};
