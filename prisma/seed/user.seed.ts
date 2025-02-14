import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const addUser = async () => {
  const addUserQuery = [];
  for (let i = 0; i < 50; i++) {
    const email = faker.internet.email();
    console.log("🌱 ~ addUser ~ email:", email);
    addUserQuery.push({
      email,
      name: faker.person.fullName(),
      passwordHash: faker.internet.email(),
    } satisfies Prisma.UserCreateInput);
  }

  return await prisma.user.createManyAndReturn({
    data: addUserQuery,
  });
};
