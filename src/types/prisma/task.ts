import * as z from "zod"
import { TaskStatus } from "@prisma/client"
import { CompleteTodo, RelatedTodoModel, CompleteUser, RelatedUserModel } from "./index"

export const TaskModel = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  status: z.nativeEnum(TaskStatus),
  dueDate: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
  todoId: z.string(),
  authorId: z.string(),
})

export interface CompleteTask extends z.infer<typeof TaskModel> {
  todo: CompleteTodo
  author: CompleteUser
}

/**
 * RelatedTaskModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTaskModel: z.ZodSchema<CompleteTask> = z.lazy(() => TaskModel.extend({
  todo: RelatedTodoModel,
  author: RelatedUserModel,
}))
