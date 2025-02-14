import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type GetTaskQueryProps = {
  where: Prisma.TaskWhereUniqueInput;
  include?: Prisma.TaskInclude;
};

export const GetTaskQuery = async ({ where, include }: GetTaskQueryProps) => {
  const task = await prisma.task.findUnique({
    where: {
      deletedAt: null,
      ...where,
    },
    include: {
      ...include,
    },
  });

  return task;
};
