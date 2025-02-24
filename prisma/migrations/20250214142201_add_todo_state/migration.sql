-- CreateEnum
CREATE TYPE "TodoState" AS ENUM ('PRIVATE', 'PUBLIC');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "state" "TodoState" NOT NULL DEFAULT 'PRIVATE';
