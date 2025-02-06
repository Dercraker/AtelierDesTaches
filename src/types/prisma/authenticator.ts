import * as z from "zod";
import type { CompleteUser } from "./index";
import { RelatedUserModel } from "./index";

export const AuthenticatorModel = z.object({
  credentialID: z.string(),
  userId: z.string(),
  providerAccountId: z.string(),
  credentialPublicKey: z.string(),
  counter: z.number().int(),
  credentialDeviceType: z.string(),
  credentialBackedUp: z.boolean(),
  transports: z.string().nullish(),
});

export type CompleteAuthenticator = {
  user: CompleteUser;
} & z.infer<typeof AuthenticatorModel>;

/**
 * RelatedAuthenticatorModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAuthenticatorModel: z.ZodSchema<CompleteAuthenticator> =
  z.lazy(() =>
    AuthenticatorModel.extend({
      user: RelatedUserModel,
    }),
  );
