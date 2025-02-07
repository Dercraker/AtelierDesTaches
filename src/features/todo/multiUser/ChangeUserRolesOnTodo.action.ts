"use server";

import { todoAction } from "@/lib/action/SafeAction";
import { TodoMembershipRole } from "@prisma/client";
import { z } from "zod";
import { ChangeUserRolesOnTodoQuery } from "./ChangeUserRolesOnTodo.query";

const ChangeUserRolesOnTodoActionSchema = z.object({
  roles: z.array(z.nativeEnum(TodoMembershipRole)),
});

export const ChangeUserRolesOnTodoAction = todoAction
  .metadata({ roles: ["OWNER"] })
  .schema(ChangeUserRolesOnTodoActionSchema)
  .action(async ({ parsedInput: { roles }, ctx }) => {
    await ChangeUserRolesOnTodoQuery({
      where: {
        userId_todoId: {
          userId: ctx.user.id,
          todoId: ctx.todo.id,
        },
      },
      roles,
    });
  });
