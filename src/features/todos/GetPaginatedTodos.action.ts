"use server";

import { action } from "@/lib/action/SafeAction";
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
  includePrivate: z.string().optional(),
  lastTodoSlug: z.string().optional(),
  take: z.number().min(1).optional(),
});

export const GetPaginatedTodosAction = action
  .schema(GetPaginatedTodosActionSchema)
  .action(
    async ({ parsedInput: { where, lastTodoSlug, take, includePrivate } }) => {
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
          ...(includePrivate && {
            OR: [
              { state: "PUBLIC" },
              {
                state: "PRIVATE",
                members: {
                  some: {
                    userId: includePrivate,
                  },
                },
              },
            ],
          }),
        },
        ...(lastTodoSlug
          ? {
              cursor: { slug: lastTodoSlug },
            }
          : {}),
        take,
      });
      return todos;
    },
  );
