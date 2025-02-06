import * as z from "zod";
import { Status } from "@prisma/client";
import { CompleteUser, RelatedUserModel } from "./index";

export const TodoModel = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  status: z.nativeEnum(Status),
  dueDate: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
  ownerId: z.string(),
});

export interface CompleteTodo extends z.infer<typeof TodoModel> {
  owner: CompleteUser;
}

/**
 * RelatedTodoModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTodoModel: z.ZodSchema<CompleteTodo> = z.lazy(() =>
  TodoModel.extend({
    owner: RelatedUserModel,
  }),
);
