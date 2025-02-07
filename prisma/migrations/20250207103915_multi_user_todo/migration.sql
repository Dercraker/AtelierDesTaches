/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Todo` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TodoMembershipRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_ownerId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "ownerId";

-- CreateTable
CREATE TABLE "TodoMembership" (
    "todoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roles" "TodoMembershipRole"[] DEFAULT ARRAY['MEMBER']::"TodoMembershipRole"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TodoMembership_pkey" PRIMARY KEY ("userId","todoId")
);

-- AddForeignKey
ALTER TABLE "TodoMembership" ADD CONSTRAINT "TodoMembership_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoMembership" ADD CONSTRAINT "TodoMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
