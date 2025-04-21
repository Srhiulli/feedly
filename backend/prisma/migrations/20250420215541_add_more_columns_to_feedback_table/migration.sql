/*
  Warnings:

  - Made the column `message` on table `feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stars` on table `feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `feedback` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `feedback` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "feedback" ALTER COLUMN "message" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "stars" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
