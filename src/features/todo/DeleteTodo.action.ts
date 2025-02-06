"use server";

import { todoOwnerAction } from "@/lib/action/SafeAction";
import { DeleteTodoQuery } from "./DeleteTodo.query";

export const DeleteTodoAction = todoOwnerAction.action(async ({ ctx }) => {
  await DeleteTodoQuery({
    where: {
      slug: ctx.todo.slug,
      ownerId: ctx.user.id,
    },
  });
});
