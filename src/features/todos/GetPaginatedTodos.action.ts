"use server";

import { action } from "@/lib/action/SafeAction";
import { TodoModel } from "@/types/prisma";
import { z } from "zod";
import { GetPaginatedTodosQuery } from "./GetPaginatedTodos.query";

const GetPaginatedTodosActionSchema = z.object({
  where: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      ownerName: z.string().optional(),
    })
    .optional(),
  lastTodoSlug: z.string().optional(),
  take: z.number().min(1).optional(),
});

export const GetPaginatedTodosAction = action
  .schema(GetPaginatedTodosActionSchema)
  .action(async ({ parsedInput: { where, lastTodoSlug, take } }) => {
    const todos = await GetPaginatedTodosQuery({
      where: {
        ...where,
        ...(where?.ownerName
          ? {
              owner: {
                name: where.ownerName,
              },
            }
          : {}),
      },
      ...(lastTodoSlug
        ? {
            cursor: { slug: lastTodoSlug },
          }
        : {}),
      take,
    });
    return z.array(TodoModel).parse(todos);
  });

