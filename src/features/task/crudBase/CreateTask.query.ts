import { prisma } from "@/lib/prisma";
import { RelatedTaskModel } from "@/types/prisma";
import type { Prisma } from "@prisma/client";

type CreateTaskQueryProps = {
  data: Prisma.TaskCreateInput;
};

export const CreateTaskQuery = async ({ data }: CreateTaskQueryProps) => {
  const task = await prisma.task.create({
    data: {
      ...data,
    },
    include: {
      todo: true,
    },
  });

  return RelatedTaskModel.parse(task);
};
