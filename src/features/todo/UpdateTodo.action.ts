"use server";

import { todoOwnerAction } from "@/lib/action/SafeAction";
import { TodoModel } from "@/types/prisma";
import { Status } from "@prisma/client";
import { z } from "zod";
import { UpdateTodoQuery } from "./UpdateTodo.query";

const UpdateTodoActionSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  status: z.nativeEnum(Status).optional(),
  dueDate: z.date().optional(),
});

export const UpdateTodoAction = todoOwnerAction
  .schema(UpdateTodoActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const todo = await UpdateTodoQuery({
      where: {
        slug: ctx.todo.slug,
        ownerId: ctx.user.id,
      },
      data: {
        ...parsedInput,
      },
    });

    return TodoModel.parse(todo);
  });
