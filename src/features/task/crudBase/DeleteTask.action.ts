"use server";

import { todoAction } from "@/lib/action/SafeAction";
import { z } from "zod";
import { DeleteTaskQuery } from "./DeleteTask.query";

const DeleteTaskActionSchema = z.object({ taskSlug: z.string() });

export const DeleteTaskAction = todoAction
  .metadata({ roles: ["ADMIN", "OWNER"] })
  .schema(DeleteTaskActionSchema)
  .action(async ({ parsedInput: { taskSlug }, ctx }) => {
    await DeleteTaskQuery({
      where: {
        slug: taskSlug,
        todoId: ctx.todo.id,
      },
    });
  });
