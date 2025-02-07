"use server";

import { todoAction } from "@/lib/action/SafeAction";
import { TodoMembershipRole } from "@prisma/client";
import { z } from "zod";
import { AddUserOnTodoQuery } from "./AddUserOnTodo.query";

const AddUserOnTodoActionSchema = z.object({
  roles: z.array(z.nativeEnum(TodoMembershipRole)).optional(),
});

export const AddUserOnTodoAction = todoAction
  .schema(AddUserOnTodoActionSchema)
  .action(async ({ parsedInput: { roles }, ctx }) => {
    const todo = await AddUserOnTodoQuery({
      userId: ctx.user.id,
      roles,
      where: {
        slug: ctx.todo.slug,
      },
    });

    return todo;
  });
