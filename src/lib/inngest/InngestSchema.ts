import { z } from "zod";

export const InvitedTodoNotification = z.object({
  name: z.literal("InvitedTodoNotification"),
  data: z.object({
    token: z.string(),
    todoSlug: z.string(),
    userId: z.string(),
  }),
});

export const RemovedFromTodoNotification = z.object({
  name: z.literal("RemovedFromTodoNotification"),
  data: z.object({
    todoSlug: z.string(),
    userId: z.string(),
    adminId: z.string(),
  }),
});

export const RoleUpdated = z.object({
  name: z.literal("RoleUpdated"),
  data: z.object({
    todoId: z.string(),
    userId: z.string(),
    adminId: z.string(),
  }),
});

export const NewTaskAddedNotification = z.object({
  name: z.literal("NewTaskAddedNotification"),
  data: z.object({
    taskId: z.string(),
  }),
});

export const TaskUpdatedNotification = z.object({
  name: z.literal("TaskUpdatedNotification"),
  data: z.object({
    taskId: z.string(),
  }),
});

export const TaskDeletedNotification = z.object({
  name: z.literal("TaskDeletedNotification"),
  data: z.object({
    todoSlug: z.string(),
    userId: z.string(),
    taskName: z.string(),
  }),
});
