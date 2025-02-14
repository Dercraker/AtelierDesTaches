import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export const AddTaskOnTodo = async () => {
  const userWithoutTask = await prisma.user.findMany({
    where: {
      tasks: {
        none: {},
      },
    },
  });

  for (const user of userWithoutTask) {
    const todos = await prisma.todo.findMany({
      where: {
        members: {
          some: {
            userId: user.id,
            NOT: {
              roles: {
                has: "MEMBER",
              },
            },
          },
        },
      },
    });

    for (const todo of todos) {
      for (let i = 0; i < faker.number.int({ max: 10, min: 1 }); i++) {
        console.log(
          `🌱 ~ AddTaskOnTodo ~ Add task n°${i + 1} on todo: ${todo.slug} with author : ${user.id}`,
        );
        await prisma.task.create({
          data: {
            title: faker.commerce.productName(),
            slug: faker.lorem.word() + nanoid(2),
            authorId: user.id,
            todoId: todo.id,
            description: faker.food.description(),
            dueDate: faker.date.soon(),
          },
        });
      }
    }
  }
};
