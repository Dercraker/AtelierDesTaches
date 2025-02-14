import { PrismaClient } from "@prisma/client";
import { AddTaskOnTodo } from "./task.seed";
import {
  AddAdminOnTodos,
  AddMemberOnTodos,
  CreateOwnerTodo,
} from "./todo.seed";
import { addUser } from "./user.seed";

const prisma = new PrismaClient();

async function main() {
  await clearAll();
  const users = await addUser();

  for (const { id } of users) {
    await CreateOwnerTodo({ userId: id });
  }

  await AddAdminOnTodos();
  await AddMemberOnTodos();
  await AddTaskOnTodo();
}

const clearAll = async () => {
  console.log("🌱 ~ clearAll");

  await prisma.todoMembership.deleteMany({});
  await prisma.todo.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.user.deleteMany({});
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
