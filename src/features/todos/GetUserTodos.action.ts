"use server";

import { authAction } from "@/lib/action/SafeAction";
import { TodoModel } from "@/types/prisma";
import { z } from "zod";
import { GetUserTodosQuery } from "./GetUserTodos.query";

const GetUserTodosActionSchema = z.object({
  where: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
  lastTodoSlug: z.string().optional(),
  take: z.number().min(1).optional(),
});

export const GetUserTodosAction = authAction
  .schema(GetUserTodosActionSchema)
  .action(async ({ parsedInput: { lastTodoSlug, take, where }, ctx }) => {
    const todos = await GetUserTodosQuery({
      where: {
        ...where,
        members: {
          some: {
            userId: ctx.user.id,
          },
        },
      },
      ...(lastTodoSlug ? { cursor: { slug: lastTodoSlug } } : {}),
      take,
    });

    return z.array(TodoModel).parse(todos);
  });
