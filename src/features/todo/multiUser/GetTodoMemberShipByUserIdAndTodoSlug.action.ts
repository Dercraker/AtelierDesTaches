"use server";

import { authAction } from "@/lib/action/SafeAction";
import { TodoMembershipModel } from "@/types/prisma";
import { z } from "zod";
import { GetTodoMembershipQuery } from "./GetTodoMembership.query";

const GetTodoMemberShipByUserIdAndTodoSlugActionSchema = z.object({
  todoId: z.string(),
  userId: z.string(),
});

export const GetTodoMemberShipByUserIdAndTodoSlugAction = authAction
  .schema(GetTodoMemberShipByUserIdAndTodoSlugActionSchema)
  .action(async ({ parsedInput: { todoId, userId }, ctx }) => {
    const res = GetTodoMembershipQuery({
      where: {
        userId_todoId: {
          userId,
          todoId,
        },
      },
    });

    const { success, data } = TodoMembershipModel.safeParse(res);
    return success ? data : null;
  });
