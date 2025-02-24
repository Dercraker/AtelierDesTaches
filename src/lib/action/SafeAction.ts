import { AuthError } from "@/lib/auth/helper";
import { logger } from "@/lib/logger";
import { TodoMembershipRole } from "@prisma/client";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { AuthMiddleware, TodoMiddleware } from "./ActionMiddleware";

export class ActionError extends Error {}

type handleServerError = (e: Error) => string;

const handleServerError: handleServerError = (e) => {
  if (e instanceof ActionError) {
    logger.info("[DEV] - Action Error", e.message);
    return e.message;
  }

  if (e instanceof AuthError) {
    logger.info("[DEV] - Auth Error", e.message);
    return e.message;
  }

  logger.info("[DEV] - Unknown Error", e);

  return "An unexpected error occurred.";
};

export const action = createSafeActionClient({
  handleServerError,
});

export const authAction = createSafeActionClient({
  handleServerError,
}).use(AuthMiddleware);

/**
 * Valide que l'utilisateur actuel soit bien auth, enregistrer au pret de la todo actuel
 * @argument metadata: { roles : [] } -> Vérifie que l'utilisateur est le rôle indiquer pour faire l'action
 */
export const todoAction = createSafeActionClient({
  handleServerError,
  defineMetadataSchema() {
    return z
      .object({
        roles: z.array(z.nativeEnum(TodoMembershipRole)).optional(),
      })
      .optional();
  },
})
  .use(AuthMiddleware)
  .use(TodoMiddleware);
