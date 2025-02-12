import { SendNewTaskNotificationInngest } from "@/features/task/SendNewTaskNotification.inngest";
import { inngest } from "@/lib/inngest/InngestClient";
import { serve } from "inngest/next";

export const maxDuration = 60;

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [SendNewTaskNotificationInngest],
});
