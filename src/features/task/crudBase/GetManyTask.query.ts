import { prisma } from "@/lib/prisma";
import { TaskModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type GetManyTaskQueryProps = { where: Prisma.TaskWhereInput };

export const GetManyTaskQuery = async ({ where }: GetManyTaskQueryProps) => {
  const tasks = await prisma.task.findMany({
    where: {
      deletedAt: null,
      ...where,
    },
  });

  return tasks.map((t) => TaskModel.parse(t));
};
