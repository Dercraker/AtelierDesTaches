import { inngest } from "@/lib/inngest/InngestClient";

export const SendNewTaskNotificationInngest = inngest.createFunction(
  {
    id: "SendNewTaskNotification",
  },
  {
    event: "task:new:notification",
  },
  async ({ step, event }) => {
    // const todoMembersWithEnabledNotification = await step.run(
    //   "GetTodoMemberWithNEnabledNotification",
    //   async () => {
    //     //TODO : Query to get members
    //   },
    // );

    // await step.run("SendEmailToMembers", async () => {
    //   //TODO : Resend Send Mail to all user
    // });

    await step.sleep("wait-a-second", "10s");

    return { message: `Hello ${event.data.authorId}` };
  },
);
