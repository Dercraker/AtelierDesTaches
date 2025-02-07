import { ChangeUserRolesOnTodoQuery } from "./ChangeUserRolesOnTodo.query";

type TransfertTodoOwnershipQueryProps = {
  todoId: string;
  currentOwnerId: string;
  newOwnerId: string;
};

export const TransfertTodoOwnershipQuery = async ({
  currentOwnerId,
  newOwnerId,
  todoId,
}: TransfertTodoOwnershipQueryProps) => {
  await Promise.all([
    ChangeUserRolesOnTodoQuery({
      roles: ["MEMBER"],
      where: {
        userId_todoId: {
          todoId,
          userId: currentOwnerId,
        },
      },
    }),

    ChangeUserRolesOnTodoQuery({
      roles: ["OWNER"],
      where: {
        userId_todoId: {
          todoId,
          userId: newOwnerId,
        },
      },
    }),
  ]);
};
