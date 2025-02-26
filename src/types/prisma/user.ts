import * as z from "zod";
import {
  CompleteSession,
  RelatedSessionModel,
  CompleteAccount,
  RelatedAccountModel,
  CompleteAuthenticator,
  RelatedAuthenticatorModel,
  CompleteTodoMembership,
  RelatedTodoMembershipModel,
  CompleteTask,
  RelatedTaskModel,
} from "./index";

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  resendContactId: z.string().nullish(),
  passwordHash: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
  sessions: CompleteSession[];
  accounts: CompleteAccount[];
  Authenticator: CompleteAuthenticator[];
  todos: CompleteTodoMembership[];
  tasks: CompleteTask[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    sessions: RelatedSessionModel.array(),
    accounts: RelatedAccountModel.array(),
    Authenticator: RelatedAuthenticatorModel.array(),
    todos: RelatedTodoMembershipModel.array(),
    tasks: RelatedTaskModel.array(),
  }),
);
