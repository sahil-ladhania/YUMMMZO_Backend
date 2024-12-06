/*
  Warnings:

  - You are about to drop the `_CuisineToRestaurant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[restaurantId]` on the table `RestaurantAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_CuisineToRestaurant` DROP FOREIGN KEY `_CuisineToRestaurant_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CuisineToRestaurant` DROP FOREIGN KEY `_CuisineToRestaurant_B_fkey`;

-- DropTable
DROP TABLE `_CuisineToRestaurant`;

-- CreateTable
CREATE TABLE `_CuisineOnRestaurant` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CuisineOnRestaurant_AB_unique`(`A`, `B`),
    INDEX `_CuisineOnRestaurant_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `RestaurantAddress_restaurantId_key` ON `RestaurantAddress`(`restaurantId`);

-- AddForeignKey
ALTER TABLE `_CuisineOnRestaurant` ADD CONSTRAINT `_CuisineOnRestaurant_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cuisine`(`cuisineId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CuisineOnRestaurant` ADD CONSTRAINT `_CuisineOnRestaurant_B_fkey` FOREIGN KEY (`B`) REFERENCES `Restaurant`(`restaurantId`) ON DELETE CASCADE ON UPDATE CASCADE;
