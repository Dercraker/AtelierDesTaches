"use server";

import { authAction } from "@/lib/action/SafeAction";
import { Status } from "@prisma/client";
import { z } from "zod";
import { ChangeTodoStatusQuery } from "./ChangeTodoStatus.query";

const ChangeTodoStatusActionSchema = z.object({
  todoSlug: z.string(),
  status: z.nativeEnum(Status),
});

export const ChangeTodoStatusAction = authAction
  .schema(ChangeTodoStatusActionSchema)
  .action(async ({ parsedInput: { status, todoSlug }, ctx }) => {
    await ChangeTodoStatusQuery({
      status,
      where: {
        slug: todoSlug,
        ownerId: ctx.user.id,
      },
    });
  });
