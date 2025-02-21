"use server";

import { authAction } from "@/lib/action/SafeAction";
import { TodoMembershipRole } from "@prisma/client";
import { z } from "zod";
import { AddUserOnTodoQuery } from "./AddUserOnTodo.query";

const AddUserOnTodoActionSchema = z.object({
  todoSlug: z.string()
});

export const AddUserOnTodoAction = authAction
  .schema(AddUserOnTodoActionSchema)
  .action(async ({ parsedInput: { todoSlug }, ctx }) => {
    const todo = await AddUserOnTodoQuery({
      userId: ctx.user.id,
      where: {
        slug: todoSlug
      },
    });

    return todo;
  });
