import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type DeleteTaskQueryProps = {
  where: Prisma.TaskWhereUniqueInput;
};

export const DeleteTaskQuery = async ({ where }: DeleteTaskQueryProps) => {
  await prisma.task.delete({
    where: {
      deletedAt: null,
      ...where,
    },
  });
};
