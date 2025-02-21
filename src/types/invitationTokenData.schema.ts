import { z } from "zod";

export const InvitationTokenDataSchema = z.object({
  todoId: z.string(),
  invitedBy: z.string(),
  invitedUserId: z.string(),
  todoInvitation: z.boolean(),

});

export type InvitationTokenData = z.infer<
  typeof InvitationTokenDataSchema
>;