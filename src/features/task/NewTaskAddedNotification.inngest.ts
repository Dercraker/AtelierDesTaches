import { GetTodoMembershipsQuery } from "@/features/todo/multiUser/GetTodoMemberships.query";
import { inngest } from "@/lib/inngest/InngestClient";
import { sendEmail } from "@/lib/mail/sendEmail";
import { GetTaskQuery } from "./crudBase/GetTask.query";

export const NewTaskAddedNotificationInngest = inngest.createFunction(
  {
    id: "NewTaskAddedNotification",
  },
  {
    event: "NewTaskAddedNotification",
  },
  async ({ event, step }) => {
    const task = await step.run("GetTaskById", async () => {
      const task = await GetTaskQuery({
        where: {
          id: event.data.taskId,
        },
        include: {
          todo: true,
          author: true,
        },
      });

      return task;
    });

    const members = await step.run("GetMemberToNotify", async () => {
      const memberShips = await GetTodoMembershipsQuery({
        where: {
          todoId: task?.todoId,
        },
        include: {
          user: true,
        },
      });

      return memberShips;
    });

    await step.run("sendNotificationEmail", async () => {
      const emails = members.map((m) => m.user.email);

      await sendEmail({
        to: emails,
        subject: `New task added to ${task?.todo.title}`,
        text: `The Task: '${task?.title}', as been added to : ${task?.todo.title}, by ${task?.author.name}`,
      });
    });
  },
);
