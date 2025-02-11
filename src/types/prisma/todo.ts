import * as z from "zod";
import {
  CompleteTask,
  RelatedTaskModel,
  CompleteTodoMembership,
  RelatedTodoMembershipModel,
} from "./index";

export const TodoModel = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
});

export interface CompleteTodo extends z.infer<typeof TodoModel> {
  tasks: CompleteTask[];
  members: CompleteTodoMembership[];
}

/**
 * RelatedTodoModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTodoModel: z.ZodSchema<CompleteTodo> = z.lazy(() =>
  TodoModel.extend({
    tasks: RelatedTaskModel.array(),
    members: RelatedTodoMembershipModel.array(),
  }),
);
