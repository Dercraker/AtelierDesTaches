import { GetUserQuery } from "@/features/user/GetUserQuery";
import { inngest } from "@/lib/inngest/InngestClient";
import { sendEmail } from "@/lib/mail/sendEmail";
import { GetTodoBySlugQuery } from "./crudBase/GetTodoBySlug.query";

export const InvitationTodoNotificationInngest = inngest.createFunction(
  {
    id: "InvitationTodoNotification",
  },
  {
    event: "InvitedTodoNotification",
  },
  async ({ event, step }) => {
    const user = await step.run("GetInvitedUserById", async () => {
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

    await step.run("SendInvitationEmail", async () => {
      await sendEmail({
        to: user.email,
        subject: `Invitation on Todo : ${todo.title}`,
        text: `You've been invited to the todo:${todo.title}, click on the link to subscribe ${event.data.token}`,
      });
    });
  },
);
