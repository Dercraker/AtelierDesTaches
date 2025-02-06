"use server";

import { todoOwnerAction } from "@/lib/action/SafeAction";
import { TodoModel } from "@/types/prisma";
import { Status } from "@prisma/client";
import { z } from "zod";
import { ChangeTodoStatusQuery } from "./ChangeTodoStatus.query";

const ChangeTodoStatusActionSchema = z.object({
  status: z.nativeEnum(Status),
});

export const ChangeTodoStatusAction = todoOwnerAction
  .schema(ChangeTodoStatusActionSchema)
  .action(async ({ parsedInput: { status }, ctx }) => {
    const todo = await ChangeTodoStatusQuery({
      status,
      where: {
        slug: ctx.todo.slug,
        ownerId: ctx.user.id,
      },
    });

    return TodoModel.parse(todo);
  });
