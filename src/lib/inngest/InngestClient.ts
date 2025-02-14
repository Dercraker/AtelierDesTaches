import { logger } from "@/lib/logger";
import { EventSchemas, Inngest } from "inngest";
import type { createStepTools } from "inngest/components/InngestStepTools";
import {
  InvitedTodoNotification,
  NewTaskAddedNotification,
  RemovedFromTodoNotification,
  RoleUpdated,
  TaskDeletedNotification,
  TaskUpdatedNotification,
} from "./InngestSchema";

export const inngest = new Inngest({
  id: "AtelierDesTaches",
  schemas: new EventSchemas().fromZod([
    InvitedTodoNotification,
    RemovedFromTodoNotification,
    RoleUpdated,
    NewTaskAddedNotification,
    TaskUpdatedNotification,
    TaskDeletedNotification,
  ]),
  logger: logger,
});

export type InngestStep = ReturnType<typeof createStepTools<typeof inngest>>;
