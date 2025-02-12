import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

type CreateTodoProps = {
  userId: string;
};

const GenerateAddTodoQuery = () => {
  const title = faker.lorem.words(3);
  const slug = faker.lorem.word() + nanoid(5);
  return {
    title,
    slug,
    description: faker.commerce.productDescription(),
    dueDate: faker.date.soon(),
  } satisfies Prisma.TodoCreateInput;
};

export const CreateOwnerTodo = async ({ userId }: CreateTodoProps) => {
  for (let i = 0; i < faker.number.int({ min: 2, max: 5 }); i++) {
    const dataBase = GenerateAddTodoQuery();
    console.log("🌱 ~ CreateOwnerTodo ~ todo.create:", dataBase.title);
    await prisma.todo.create({
      data: {
        ...dataBase,
        members: {
          create: {
            userId,
            roles: ["OWNER"],
          },
        },
      },
    });
  }
};

export const AddAdminOnTodos = async () => {
  const todoWithoutAdmin = await prisma.todo.findMany({
    where: {
      members: {
        none: {
          roles: {
            has: "ADMIN",
          },
        },
      },
    },
    include: {
      members: true,
    },
  });

  const limitedTodos = todoWithoutAdmin.slice(
    0,
    Math.ceil(todoWithoutAdmin.length * 0.7),
  );

  const users = await prisma.user.findMany();

  for (const todo of limitedTodos) {
    const availableUsers = users.filter((user) =>
      todo.members.some((member) => member.userId !== user.id),
    );

    if (availableUsers.length > 0) {
      const randomUser =
        availableUsers[Math.floor(Math.random() * availableUsers.length)];
      console.log(
        `🌱 ~ AddAdminOnTodo ~ user ${randomUser.id}, todo :${todo.slug}`,
      );
      await prisma.todo.update({
        where: { id: todo.id },
        data: {
          members: {
            create: {
              userId: randomUser.id,
              roles: ["ADMIN"],
            },
          },
        },
      });
    }
  }
};

export const AddMemberOnTodos = async () => {
  const todoWithoutMember = await prisma.todo.findMany({
    where: {
      members: {
        none: {
          roles: {
            has: "MEMBER",
          },
        },
      },
    },
    include: {
      members: true,
    },
  });

  const limitedTodos = todoWithoutMember.slice(
    0,
    Math.ceil(todoWithoutMember.length * 0.9),
  );

  const users = await prisma.user.findMany();

  for (const todo of limitedTodos) {
    const availableUsers = users.filter((user) =>
      todo.members.some((member) => member.userId !== user.id),
    );

    if (availableUsers.length > 0) {
      const randomUser =
        availableUsers[Math.floor(Math.random() * availableUsers.length)];
      console.log(
        `🌱 ~ AddMemberOnTodo ~ user ${randomUser.id}, todo :${todo.slug}`,
      );
      await prisma.todo.update({
        where: { id: todo.id },
        data: {
          members: {
            create: {
              userId: randomUser.id,
              roles: ["MEMBER"],
            },
          },
        },
      });
    }
  }
};
