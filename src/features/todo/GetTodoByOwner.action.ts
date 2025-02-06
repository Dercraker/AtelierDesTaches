"use server";

import { authAction } from "@/lib/action/SafeAction";
import { TodoModel } from "@/types/prisma";
import { z } from "zod";
import { GetTodoByOwnerQuery } from "./GetTodoByOwner.query";

const GetTodoByOwnerActionSchema = z.object({
  todoSlug: z.string(),
});

export const GetTodoByOwnerAction = authAction
  .schema(GetTodoByOwnerActionSchema)
  .action(async ({ parsedInput: { todoSlug }, ctx }) => {
    const todo = await GetTodoByOwnerQuery({
      where: {
        slug: todoSlug,
      },
      ownerId: ctx.user.id,
    });

    return TodoModel.parse(todo);
  });
