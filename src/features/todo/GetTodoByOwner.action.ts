"use server";

import { todoOwnerAction } from "@/lib/action/SafeAction";
import { TodoModel } from "@/types/prisma";
import { GetTodoByOwnerQuery } from "./GetTodoByOwner.query";

export const GetTodoByOwnerAction = todoOwnerAction.action(async ({ ctx }) => {
  const todo = await GetTodoByOwnerQuery({
    where: {
      slug: ctx.todo.slug,
    },
    ownerId: ctx.user.id,
  });

  return TodoModel.parse(todo);
});
