"use server";

import { GetTodoBySlugQuery } from "@/features/todo/crudBase/GetTodoBySlug.query";
import { GetUserQuery } from "@/features/user/GetUserQuery";
import { authAction } from "@/lib/action/SafeAction";
import { InvitationTokenDataSchema } from "@/types/invitationTokenData.schema";
import { z } from "zod";
import { GetTokenInviteQuery } from "./GetVerificationToken.query";

const VerifyTokenSchema = z.object({
  token: z.string().min(10), 
});

export const VerifyTokenAction = authAction
  .schema(VerifyTokenSchema)
  .action(async ({ parsedInput: { token }, ctx }) => {
    const userId = ctx.user.id; 

    const verificationToken = await GetTokenInviteQuery({ where: { token } });
    if (!verificationToken) {
      throw new Error("Expired token");
    }
    
    if (new Date() > new Date(verificationToken.expires)) {
      throw new Error("Expired token");
    }
    
    const data = InvitationTokenDataSchema.parse(verificationToken.data);
    if (data.invitedUserId !== userId) {
      throw new Error("Vous n'êtes pas l'utilisateur invité");
    }

    const ownerUser = await GetUserQuery({
      where: { id: data.invitedBy },
      select: { name: true },
    });

    const invitedUser = await GetUserQuery({
      where: { id: data.invitedUserId },
      select: { name: true },
    });

    const todo = await GetTodoBySlugQuery({
      where: { id: data.todoId },
    });

    if (!ownerUser || !invitedUser || !todo) {
      throw new Error("Impossible de récupérer les informations de l'invitation");
    }

    return {
      todoTitle: todo.title,
      todoSlug: todo.slug,
      invitedBy: ownerUser.name,
      invitedUser: invitedUser.name,
    };
  });
