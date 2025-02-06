"use server";

import { authAction } from "@/lib/action/SafeAction";
import { Status } from "@prisma/client";
import { z } from "zod";
import { UpdateTodoQuery } from "./UpdateTodo.query";

const UpdateTodoActionSchema = z.object({
  slug: z.string(),
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  status: z.nativeEnum(Status).optional(),
  dueDate: z.date().optional(),
});

export const UpdateTodoAction = authAction
  .schema(UpdateTodoActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const todo = await UpdateTodoQuery({
      where: {
        slug: parsedInput.slug,
        ownerId: ctx.user.id,
      },
      data: {
        ...parsedInput,
      },
    });
  });
