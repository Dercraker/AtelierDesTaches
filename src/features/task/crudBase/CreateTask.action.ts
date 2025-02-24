"use server";

import { todoAction } from "@/lib/action/SafeAction";
import { RelatedTaskModel } from "@/types/prisma";
import { generateSlug } from "@/utils/format/id";
import { z } from "zod";
import { CreateTaskQuery } from "./CreateTask.query";

const CreateTaskActionSchema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.date().optional(),
});

export const CreateTaskAction = todoAction
  .schema(CreateTaskActionSchema)
  .action(async ({ parsedInput: { description, title, dueDate }, ctx }) => {
    const task = await CreateTaskQuery({
      data: {
        title: title,
        slug: generateSlug(title),
        description,
        dueDate,
        author: {
          connect: {
            id: ctx.user.id,
          },
        },
        todo: {
          connect: {
            id: ctx.todo.id,
          },
        },
      },
    });

    return RelatedTaskModel.parse(task);
  });
