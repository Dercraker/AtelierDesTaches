import { inngest } from "@/lib/inngest/InngestClient";
import { sendEmail } from "@/lib/mail/sendEmail";
import { GetUserQuery } from "@/features/user/GetUserQuery";
import { GetTodoBySlugQuery } from "./crudBase/GetTodoBySlug.query";

export const RemovedFromTodoNotificationInngest = inngest.createFunction(
  {
    id: "RemovedFromTodoNotification",
  },
  {
    event: "RemovedFromTodoNotification",
  },
  async ({ event, step }) => {
    const user = await step.run("GetUserId", async () => {
      const user = await GetUserQuery({
        where: {
          id: event.data.userId,
        },
      });

      return user;
    });

    const admin = await step.run("GetAdminId", async () => {
      const admin = await GetUserQuery({ where: { id: event.data.adminId } });
      return admin;
    });

    const todo = await step.run("GetTodoId", async () => {
      const todo = await GetTodoBySlugQuery({
        where: {
          slug: event.data.todoSlug,
        },
      });
      return todo;
    });

    await step.run("SendEmail", async () => {
      await sendEmail({
        to: user.email,
        subject: "Removed from Todo",
        text: `You have been removed from this todo: ${todo.title} by ${admin.name}`,
      });
    });
  },
);
