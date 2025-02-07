"use server";

import { todoAction } from "@/lib/action/SafeAction";
import { TodoModel } from "@/types/prisma";
import { Status } from "@prisma/client";
import { z } from "zod";
import { ChangeTodoStatusQuery } from "./ChangeTodoStatus.query";

const ChangeTodoStatusActionSchema = z.object({
  status: z.nativeEnum(Status),
});

export const ChangeTodoStatusAction = todoAction
  .metadata({ roles: ["MEMBER", "ADMIN", "OWNER"] })
  .schema(ChangeTodoStatusActionSchema)
  .action(async ({ parsedInput: { status }, ctx }) => {
    const todo = await ChangeTodoStatusQuery({
      status,
      where: {
        slug: ctx.todo.slug,
      },
    });

    return TodoModel.parse(todo);
  });
