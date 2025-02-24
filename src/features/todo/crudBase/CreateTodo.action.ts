"use server";

import { authAction } from "@/lib/action/SafeAction";
import { TodoModel } from "@/types/prisma";
import { generateSlug } from "@/utils/format/id";
import { z } from "zod";
import { CreateTodoQuery } from "./CreateTodo.query";

const CreateTodoSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10).nullish(),
});

export const CreateTodoAction = authAction
  .schema(CreateTodoSchema)
  .action(async ({ parsedInput: { title, description }, ctx }) => {
    const todo = await CreateTodoQuery({
      data: {
        title,
        slug: generateSlug(title),
        description,
        members: {
          create: {
            roles: ["OWNER"],
            user: {
              connect: {
                id: ctx.user.id,
              },
            },
          },
        },
      },
    });

    TodoModel.parse(todo);
  });
