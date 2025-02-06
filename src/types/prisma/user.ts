import * as z from "zod";
import type {
  CompleteSession,
  CompleteAccount,
  CompleteAuthenticator,
} from "./index";
import {
  RelatedSessionModel,
  RelatedAccountModel,
  RelatedAuthenticatorModel,
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

export type CompleteUser = {
  sessions: CompleteSession[];
  accounts: CompleteAccount[];
  Authenticator: CompleteAuthenticator[];
} & z.infer<typeof UserModel>;

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
  }),
);
