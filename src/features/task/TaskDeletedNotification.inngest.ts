import { GetTodoBySlugQuery } from "@/features/todo/crudBase/GetTodoBySlug.query";
import { GetTodoMembershipsQuery } from "@/features/todo/multiUser/GetTodoMemberships.query";
import { GetUserQuery } from "@/features/user/GetUser.query";
import { inngest } from "@/lib/inngest/InngestClient";
import { sendEmail } from "@/lib/mail/sendEmail";

export const TaskDeletedNotificationInngest = inngest.createFunction(
  {
    id: "TaskDeletedNotificationInngest",
  },
  {
    event: "TaskDeletedNotification",
  },
  async ({ event, step }) => {
    const user = await step.run("GetUserById", async () => {
      const user = await GetUserQuery({
        where: {
          id: event.data.userId,
        },
      });

      return user;
    });

    const todo = await step.run("GetTodoById", async () => {
      const todo = await GetTodoBySlugQuery({
        where: {
          slug: event.data.todoSlug,
        },
      });

      return todo;
    });

    const members = await step.run("GetTodoMembers", async () => {
      const members = await GetTodoMembershipsQuery({
        where: {
          todoId: todo.id,
        },
      });
      return members;
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
