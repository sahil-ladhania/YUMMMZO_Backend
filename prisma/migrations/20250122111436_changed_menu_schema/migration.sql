/*
  Warnings:

  - You are about to drop the column `isVeg` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `ratings` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `totalReviews` on the `MenuItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `MenuItem` DROP COLUMN `isVeg`,
    DROP COLUMN `ratings`,
    DROP COLUMN `totalReviews`,
    ADD COLUMN `isPureVeg` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `itemPrice` INTEGER NOT NULL DEFAULT 0;
