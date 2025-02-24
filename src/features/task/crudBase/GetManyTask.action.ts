"use server";

import { authAction } from "@/lib/action/SafeAction";
import { z } from "zod";
import { GetManyTaskQuery } from "./GetManyTask.query";

const GetManyTaskActionSchema = z.object({
  todoSlug: z.string(),
});

export const GetManyTaskAction = authAction
  .schema(GetManyTaskActionSchema)
  .action(async ({ parsedInput: { todoSlug }, ctx }) => {
    const tasks = await GetManyTaskQuery({
      where: { todo: { slug: todoSlug } },
    });

    return tasks;
  });
