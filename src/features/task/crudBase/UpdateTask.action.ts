"use server";

import { todoAction } from "@/lib/action/SafeAction";
import { prisma } from "@/lib/prisma";
import { TaskModel } from "@/types/prisma";
import { z } from "zod";

const UpdateTaskActionSchema = z.object({
  taskSlug: z.string(),
  title: z.string(),
  description: z.string(),
  dueDate: z.date(),
});

export const UpdateTaskAction = todoAction
  .metadata({ roles: ["ADMIN", "OWNER"] })
  .schema(UpdateTaskActionSchema)
  .action(
    async ({ parsedInput: { description, dueDate, taskSlug, title }, ctx }) => {
      const task = await prisma.task.update({
        where: {
          slug: taskSlug,
          todoId: ctx.todo.id,
        },
        data: {
          title,
          description,
          dueDate,
        },
      });

      return TaskModel.parse(task);
    },
  );
