/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId,menuName]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Menu_restaurantId_menuName_key` ON `Menu`(`restaurantId`, `menuName`);
