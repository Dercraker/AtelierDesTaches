import { logger } from "@/lib/logger";
import { EventSchemas, Inngest } from "inngest";
import type { createStepTools } from "inngest/components/InngestStepTools";
import { SendNewTaskNotification } from "./InngestSchema";

export const inngest = new Inngest({
  id: "AtelierDesTaches",
  schemas: new EventSchemas().fromZod([SendNewTaskNotification]),
  logger: logger,
});

export type InngestStep = ReturnType<typeof createStepTools<typeof inngest>>;
