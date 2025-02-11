"use server";

import { todoAction } from "@/lib/action/SafeAction";
import { z } from "zod";
import { RemoveUserOnTodoQuery } from "./RemoveUserOnTodo.query";

const RemoveUserOnTodoActionSchema = z.object({
  userId: z.string(),
});

export const RemoveUserOnTodoAction = todoAction
  .metadata({ roles: ["ADMIN", "OWNER"] })
  .schema(RemoveUserOnTodoActionSchema)
  .action(async ({ parsedInput: { userId }, ctx }) => {
    await RemoveUserOnTodoQuery({
      where: {
        userId_todoId: {
          todoId: ctx.todo.id,
          userId,
        },
      },
    });
  });
