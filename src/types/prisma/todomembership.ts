import * as z from "zod"
import { TodoMembershipRole } from "@prisma/client"
import { CompleteTodo, RelatedTodoModel, CompleteUser, RelatedUserModel } from "./index"

export const TodoMembershipModel = z.object({
  todoId: z.string(),
  userId: z.string(),
  roles: z.nativeEnum(TodoMembershipRole).array(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
})

export interface CompleteTodoMembership extends z.infer<typeof TodoMembershipModel> {
  todo: CompleteTodo
  user: CompleteUser
}

/**
 * RelatedTodoMembershipModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTodoMembershipModel: z.ZodSchema<CompleteTodoMembership> = z.lazy(() => TodoMembershipModel.extend({
  todo: RelatedTodoModel,
  user: RelatedUserModel,
}))
