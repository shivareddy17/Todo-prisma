/*
  Warnings:

  - You are about to drop the column `address` on the `user1` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user1" DROP COLUMN "address";

-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
