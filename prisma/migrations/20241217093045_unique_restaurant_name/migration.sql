/*
  Warnings:

  - A unique constraint covering the columns `[restaurantName]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Restaurant_restaurantName_key` ON `Restaurant`(`restaurantName`);
