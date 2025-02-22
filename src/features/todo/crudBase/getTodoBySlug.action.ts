"use server";

import { authAction } from "@/lib/action/SafeAction";
import { z } from "zod";
import { GetTodoBySlugQuery } from "./GetTodoBySlug.query";

const GetTodoBySlugActionSchema = z.object({
  todoSlug: z.string(),
});

export const GetTodoBySlugAction = authAction
  .schema(GetTodoBySlugActionSchema)
  .action(async ({ parsedInput: { todoSlug }, ctx }) => {
    const todo = await GetTodoBySlugQuery({
      where: {
        slug: todoSlug,
      },
    });

    return todo;
  });
