"use server";

import { todoAction } from "@/lib/action/SafeAction";
import { TaskModel } from "@/types/prisma";
import { TaskStatus } from "@prisma/client";
import { z } from "zod";
import { ChangeTaskStatusQuery } from "./ChangeTaskStatus.query";

const ChangeTaskStatusActionSchema = z.object({
  taskSlug: z.string(),
  status: z.nativeEnum(TaskStatus),
});

export const ChangeTaskStatusAction = todoAction
  .schema(ChangeTaskStatusActionSchema)
  .action(async ({ parsedInput: { status, taskSlug }, ctx }) => {
    const task = await ChangeTaskStatusQuery({
      status,
      where: {
        slug: taskSlug,
        todo: {
          id: ctx.todo.id,
        },
      },
    });

    return TaskModel.parse(task);
  });
