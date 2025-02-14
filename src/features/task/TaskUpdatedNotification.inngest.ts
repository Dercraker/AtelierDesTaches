import { inngest } from "@/lib/inngest/InngestClient";
import { sendEmail } from "@/lib/mail/sendEmail";
import { GetTodoMembershipsQuery } from "../todo/multiUser/GetTodoMemberships.query";
import { GetTaskQuery } from "./crudBase/GetTask.query";

export const TaskUpdatedNotificationInngest = inngest.createFunction(
  {
    id: "TaskUpdatedNotificationInngest",
  },
  {
    event: "TaskUpdatedNotification",
  },
  async ({ event, step }) => {
    const task = await step.run("GetTaskById", async () => {
      return await GetTaskQuery({
        where: {
          id: event.data.taskId,
        },
        include: {
          author: true,
          todo: true,
        },
      });
    });

    const todo = task?.todo;

    const members = await step.run("GetTodoMembership", async () => {
      return await GetTodoMembershipsQuery({
        where: {
          todoId: todo?.id,
        },
      });
    });

    await step.run(
      "SendNotificationEmail",
      async () =>
        await sendEmail({
          to: members.map((m) => m.user.email),
          subject: `Task : ${task?.title} as been updated`,
          text: `Task : ${task?.title}, in todo: ${todo?.title} as been updated by ${task?.author.name}`,
        }),
    );
  },
);
