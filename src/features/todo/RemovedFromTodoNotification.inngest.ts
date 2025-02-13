import { inngest } from "@/lib/inngest/InngestClient";
import { sendEmail } from "@/lib/mail/sendEmail";
import { GetUserQuery } from "../user/GetUserQuery";
import { GetTodoBySlugQuery } from "./crudBase/GetTodoBySlug.query";

export const RemovedFromTodoNotificationInngest = inngest.createFunction(
  {
    id: "RemovedFromTodoNotification",
  },
  {
    event: "RemovedFromTodoNotification",
  },
  async ({ event, step }) => {
    const user = await step.run(
      "GetUserId",
      async () =>
        await GetUserQuery({
          where: {
            id: event.data.userId,
          },
        }),
    );

    const admin = await step.run(
      "GetAdminId",
      async () => await GetUserQuery({ where: { id: event.data.adminId } }),
    );

    const todo = await step.run(
      "GetTodoId",
      async () =>
        await GetTodoBySlugQuery({
          where: {
            slug: event.data.todoSlug,
          },
        }),
    );

    await step.run(
      "SendEmail",
      async () =>
        await sendEmail({
          to: user.email,
          subject: "Removed from Todo",
          text: `You have been removed from this todo: ${todo.title} by ${admin.name}`,
        }),
    );
  },
);
