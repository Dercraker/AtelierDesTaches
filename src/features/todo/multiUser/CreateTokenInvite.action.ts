"use server";

import { authAction } from "@/lib/action/SafeAction";
import { prisma } from "@/lib/prisma";
import { VerificationTokenModel } from "@/types/prisma";
import { addDays } from "date-fns";
import { nanoid } from "nanoid";
import { z } from "zod";

const CreateVerifyTokenSchema = z.object({
  invitedUserId: z.string().uuid(),
  todoId: z.string().uuid(),
});

export const CreateVerifyTokenAction = authAction
  .schema(CreateVerifyTokenSchema)
  .action(async ({ parsedInput: { invitedUserId, todoId }, ctx }) => {

    const token = nanoid(32);
    const expirationDate = addDays(new Date(), 7); 

    const verificationToken = await prisma.verificationToken.create({
      data: {
        identifier: invitedUserId,
        token: token,
        expires: expirationDate,
        data: {
          todoId: todoId,
          invitedBy: ctx.user.id, 
          invitedUserId: invitedUserId,
          context: "TODO INVITATION",
        },
      },
    });

    VerificationTokenModel.parse(verificationToken);
  });
