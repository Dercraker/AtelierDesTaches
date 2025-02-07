"use server";

import { todoAction } from "@/lib/action/SafeAction";
import { DeleteTodoQuery } from "./DeleteTodo.query";

export const DeleteTodoAction = todoAction
  .metadata({ roles: ["OWNER"] })
  .action(async ({ ctx }) => {
    await DeleteTodoQuery({
      where: {
        slug: ctx.todo.slug,
      },
    });
  });
