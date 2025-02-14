import { GetTodoMembershipsQuery } from "@/features/todo/multiUser/GetTodoMemberships.query";
import { inngest } from "@/lib/inngest/InngestClient";
import { sendEmail } from "@/lib/mail/sendEmail";
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
      const task = await GetTaskQuery({
        where: {
          id: event.data.taskId,
        },
        include: {
          author: true,
          todo: true,
        },
      });
      return task;
    });

    const todo = task?.todo;

    const members = await step.run("GetTodoMembership", async () => {
      const members = await GetTodoMembershipsQuery({
        where: {
          todoId: todo?.id,
        },
      });
      return members;
    });

    await step.run("SendNotificationEmail", async () => {
      await sendEmail({
        to: members.map((m) => m.user.email),
        subject: `Task : ${task?.title} as been updated`,
        text: `Task : ${task?.title}, in todo: ${todo?.title} as been updated by ${task?.author.name}`,
      });
    });
  },
);
