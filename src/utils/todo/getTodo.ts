import { GetTodoBySlugQuery } from "@/features/todo/GetTodoBySlug.query";
import { requiredAuth } from "@/lib/auth/helper";
import { TodoModel } from "@/types/prisma";
import type { TodoMembershipRole } from "@prisma/client";
import { headers } from "next/headers";

const GetTodoSlugFromUrl = async () => {
  const headerList = await headers();
  const xURL = headerList.get("x-url");

  if (!xURL) return null;

  // get the parameters after /orgs/ or /organizations/ and before a / or ? (if there are params)
  const match = xURL.match(/\/(?:todos)\/([^/?]+)(?:[/?]|$)/);

  if (!match) return null;

  const todoSlug = match[1];

  if (!todoSlug) return null;

  return todoSlug;
};

export const GetCurrentTodo = async ({
  roles,
}: {
  roles?: TodoMembershipRole[];
}) => {
  const todoSlug = await GetTodoSlugFromUrl();
  const user = await requiredAuth();

  if (!todoSlug) return null;

  const todo = await GetTodoBySlugQuery({
    where: {
      slug: todoSlug,
      members: {
        some: {
          userId: user.id,
          roles: roles
            ? {
                hasSome: [...roles, "OWNER"],
              }
            : undefined,
        },
      },
    },
  });

  if (!todo) return null;

  return TodoModel.parse(todo);
};
