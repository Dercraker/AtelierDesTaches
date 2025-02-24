import { auth } from "@/lib/auth/helper";
import { GetCurrentTodo } from "@/utils/todo/getTodo";
import type { TodoMembershipRole, User } from "@prisma/client";
import { createMiddleware } from "next-safe-action";
import { ActionError } from "./SafeAction";

const getAuthUser = async () => {
  const user = await auth();

  if (!user) {
    throw new ActionError("Session not found!");
  }

  if (!user.id || !user.email) {
    throw new ActionError("Session is not valid!");
  }

  return user as User;
};

export const AuthMiddleware = createMiddleware().define(async ({ next }) => {
  const user = await getAuthUser();

  return next({
    ctx: {
      user: user as User,
    },
  });
});

export const TodoMiddleware = createMiddleware<{
  ctx: { user: User };
  metadata?: { roles: TodoMembershipRole[] | undefined };
}>().define(async ({ next, metadata: { roles } }) => {
  try {
    const todo = await GetCurrentTodo({ roles });

    if (!todo) throw new ActionError();

    return next({
      ctx: {
        todo,
      },
    });
  } catch {
    throw new ActionError("You don't have permissions to take this action");
  }
});
