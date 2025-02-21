"use server";

import { todoAction } from "@/lib/action/SafeAction";
import { VerificationTokenModel } from "@/types/prisma";
import { addDays } from "date-fns";
import { nanoid } from "nanoid";
import { z } from "zod";
import { CreateTokenInviteQuery } from "./CreateTokenInvite.query";

const CreateVerifyTokenSchema = z.object({
  invitedUserId: z.string().uuid(),
  todoId: z.string().uuid(),
});

export const CreateVerifyTokenAction = todoAction
  .schema(CreateVerifyTokenSchema)
  .action(async ({ parsedInput: { invitedUserId, todoId }, ctx }) => {
    const token = nanoid(32);
    const expirationDate = addDays(new Date(), 7);

    const verificationToken = await CreateTokenInviteQuery({
      data: {
        identifier: invitedUserId,
        token: token,
        expires: expirationDate,
        data: {
          todoId: todoId,
          invitedBy: ctx.user.id,
          invitedUserId: invitedUserId,
          todoInvitation: true,
        },
      },
    });

    VerificationTokenModel.parse(verificationToken);
  });
