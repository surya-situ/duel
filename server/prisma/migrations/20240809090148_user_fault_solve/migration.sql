/*
  Warnings:

  - You are about to drop the column `email_verified_roken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "email_verified_roken",
ADD COLUMN     "email_verified_token" TEXT;
