"use server";

import { todoAction } from "@/lib/action/SafeAction";
import { z } from "zod";
import { TransfertTodoOwnershipQuery } from "./TransfertTodoOwnership.query";

const TransfertTodoOwnershipActionSchema = z.object({
  newOwnerId: z.string(),
});

export const TransfertTodoOwnershipAction = todoAction
  .metadata({ roles: ["OWNER"] })
  .schema(TransfertTodoOwnershipActionSchema)
  .action(async ({ parsedInput: { newOwnerId }, ctx }) => {
    await TransfertTodoOwnershipQuery({
      currentOwnerId: ctx.user.id,
      newOwnerId,
      todoId: ctx.todo.id,
    });
  });
