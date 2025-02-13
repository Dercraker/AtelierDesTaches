import { NewTaskAddedNotificationInngest } from "@/features/task/NewTaskAddedNotification.inngest";
import { TaskDeletedNotificationInngest } from "@/features/task/TaskDeletedNotification.inngest";
import { TaskUpdatedNotificationInngest } from "@/features/task/TaskUpdatedNotification.inngest";
import { InvitationTodoNotificationInngest } from "@/features/todo/InvitationTodoNotification.inngest";
import { RemovedFromTodoNotificationInngest } from "@/features/todo/RemovedFromTodoNotification.inngest";
import { inngest } from "@/lib/inngest/InngestClient";
import { serve } from "inngest/next";

export const maxDuration = 60;

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    NewTaskAddedNotificationInngest,
    TaskDeletedNotificationInngest,
    TaskUpdatedNotificationInngest,
    InvitationTodoNotificationInngest,
    RemovedFromTodoNotificationInngest,
  ],
});
