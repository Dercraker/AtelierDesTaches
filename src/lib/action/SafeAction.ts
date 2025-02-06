import { createSafeActionClient } from "next-safe-action";
import { AuthError } from "../auth/helper";
import { logger } from "../logger";
import { AuthMiddleware, TodoOwnerMiddleware } from "./ActionMiddleware";

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

export const todoOwnerAction = createSafeActionClient({
  handleServerError,
})
  .use(AuthMiddleware)
  .use(TodoOwnerMiddleware);
