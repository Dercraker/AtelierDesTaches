"use server";

import { authAction } from "@/lib/action/SafeAction";
import { z } from "zod";
import { DeleteTodoQuery } from "./DeleteTodo.query";

const DeleteTodoActionSchema = z.object({
  todoSlug: z.string(),
});

export const DeleteTodoAction = authAction
  .schema(DeleteTodoActionSchema)
  .action(async ({ parsedInput: { todoSlug }, ctx }) => {
    await DeleteTodoQuery({
      where: {
        slug: todoSlug,
        ownerId: ctx.user.id,
      },
    });
  });
