import { inngest } from "@/lib/inngest/InngestClient";
import { sendEmail } from "@/lib/mail/sendEmail";
import { GetTodoBySlugQuery } from "../todo/crudBase/GetTodoBySlug.query";
import { GetTodoMembershipQuery } from "../todo/multiUser/GetTodoMembership.query";
import { GetUserQuery } from "../user/GetUserQuery";

export const TaskDeletedNotificationInngest = inngest.createFunction(
  {
    id: "TaskDeletedNotificationInngest",
  },
  {
    event: "TaskDeletedNotification",
  },
  async ({ event, step }) => {
    const user = await step.run("GetUserById", async () => {
      return await GetUserQuery({
        where: {
          id: event.data.userId,
        },
      });
    });

    const todo = await step.run("GetTodoById", async () => {
      return await GetTodoBySlugQuery({
        where: {
          slug: event.data.todoSlug,
        },
      });
    });

    const members = await step.run("GetTodoMembers", async () => {
      return await GetTodoMembershipQuery({
        where: {
          todoId: todo.id,
        },
      });
    });

    await step.run("SendNotificationEmail", async () => {
      const emails = members.map((m) => m.user.email);
      await sendEmail({
        to: emails,
        subject: `Task : ${event.data.taskName} as deleted`,
        text: `Task : ${event.data.taskName} as been deleted from todo: ${todo.title}, by ${user.name}`,
      });
    });
  },
);
