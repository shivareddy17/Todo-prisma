/*
  Warnings:

  - Added the required column `address` to the `user1` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user1" ADD COLUMN     "address" TEXT NOT NULL;
