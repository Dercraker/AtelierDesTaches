import { inngest } from "@/lib/inngest/InngestClient";
import { sendEmail } from "@/lib/mail/sendEmail";
import { GetUserQuery } from "../user/GetUserQuery";
import { GetTodoBySlugQuery } from "./crudBase/GetTodoBySlug.query";
import { GetTodoMembershipQuery } from "./multiUser/GetTodoMembership.query";

export const RoleUpdatedInngest = inngest.createFunction(
  {
    id: "RoleUpdatedInngest",
  },
  {
    event: "RoleUpdated",
  },
  async ({ event, step }) => {
    const todo = await step.run("GetTodoById", async () =>
      GetTodoBySlugQuery({
        where: {
          slug: event.data.todoSlug,
        },
      }),
    );

    const user = await step.run(
      "GetUserById",
      async () =>
        await GetUserQuery({
          where: {
            id: event.data.userId,
          },
        }),
    );

    const admin = await step.run(
      "GetAdminById",
      async () =>
        await GetUserQuery({
          where: {
            id: event.data.adminId,
          },
        }),
    );

    const memberShip = await step.run("GetUserMemberShip", async () =>
      GetTodoMembershipQuery({
        where: {
          userId_todoId: {
            todoId: todo.id,
            userId: user.id,
          },
        },
      }),
    );

    await step.run("SendEmail", async () =>
      sendEmail({
        to: user.email,
        subject: `Role Updated in todo : ${todo.title}`,
        text: `Your role has been updated in the todo: ${todo.title}, by ${admin.name}. You now have these roles ${memberShip.roles.join(", ")}`,
      }),
    );
  },
);
