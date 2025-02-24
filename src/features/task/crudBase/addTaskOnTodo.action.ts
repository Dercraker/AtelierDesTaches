"use server";

import { authAction } from "@/lib/action/SafeAction";
import { generateSlug } from "@/utils/format/id";
import { z } from "zod";
import { AddTaskOnTodoQuery } from "./addTaskOnTodo.query";

const AddTaskOnTodoActionSchema = z.object({
  title: z.string(),
  description: z.string().nullish(),
  dueDate: z.date().nullish(),
  todoSlug: z.string(),
});

export const AddTaskOnTodoAction = authAction
  .schema(AddTaskOnTodoActionSchema)
  .action(
    async ({ parsedInput: { title, description, dueDate, todoSlug }, ctx }) => {
      const task = await AddTaskOnTodoQuery({
        data: {
          title,
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
              slug: todoSlug,
            },
          },
        },
      });

      return task;
    },
  );
