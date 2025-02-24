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
    state: faker.datatype.boolean(0.7) ? "PUBLIC" : "PRIVATE",
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
    Math.ceil(todoWithoutAdmin.length * 0.5),
  );

  const users = await prisma.user.findMany({
    where: {
      todos: {
        none: {
          todoId: {
            in: limitedTodos.map((t) => t.id),
          },
        },
      },
    },
  });

  for (const todo of limitedTodos) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
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
    Math.ceil(todoWithoutMember.length * 0.8),
  );

  const users = await prisma.user.findMany({
    where: {
      todos: {
        none: {
          todoId: {
            in: limitedTodos.map((t) => t.id),
          },
        },
      },
    },
  });

  for (const todo of limitedTodos) {
    const randomUser =
      users[faker.number.int({ min: 0, max: users.length - 1 })];
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
};
