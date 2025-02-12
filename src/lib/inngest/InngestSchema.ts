import { z } from "zod";

export const SendNewTaskNotification = z.object({
  name: z.literal("task:new:notification"),
  data: z.object({
    authorId: z.string(),
    taskId: z.string(),
    todoId: z.string(),
  }),
});
