import { inngest } from "@/lib/inngest/InngestClient";

export const InvitationTodoNotificationInngest = inngest.createFunction(
  {
    id: "InvitationTodoNotification",
  },
  {
    event: "InvitedTodoNotification",
  },
  async ({ event, step }) => {
    const user = await step.run("GetInvitedUserById", async () => {
      //TODO : Get user by id
      return "toto";
    });

    const inviter = await step.run("GetInviterUserById", async () => {
      //TODO : Get user by id
      return "invited Toto";
    });

    const todo = await step.run("GetTodoById", async () => {
      //TODO : Get todo by id
      return "My Todo";
    });

    await step.run("SendInvitationEmail", async () => {
      return "Email Send";
    });

    await step.sleep("wait-a-moment", "10s");

    return "uploaded";
  },
);
