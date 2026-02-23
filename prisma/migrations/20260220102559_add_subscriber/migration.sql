/*
  Warnings:

  - You are about to drop the column `jobType` on the `subscribers` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `subscribers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subscribers" DROP COLUMN "jobType",
DROP COLUMN "location";
