/*
  Warnings:

  - The primary key for the `OpeningDay` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OpeningDay` table. All the data in the column will be lost.
  - You are about to drop the column `restaurantId` on the `OpeningDay` table. All the data in the column will be lost.
  - You are about to alter the column `day` on the `OpeningDay` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - Added the required column `openingDayId` to the `OpeningDay` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OpeningDay` DROP FOREIGN KEY `OpeningDay_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `OpeningDay` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `restaurantId`,
    ADD COLUMN `openingDayId` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `day` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`openingDayId`);

-- CreateTable
CREATE TABLE `_RestaurantOpeningDays` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RestaurantOpeningDays_AB_unique`(`A`, `B`),
    INDEX `_RestaurantOpeningDays_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RestaurantOpeningDays` ADD CONSTRAINT `_RestaurantOpeningDays_A_fkey` FOREIGN KEY (`A`) REFERENCES `OpeningDay`(`openingDayId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RestaurantOpeningDays` ADD CONSTRAINT `_RestaurantOpeningDays_B_fkey` FOREIGN KEY (`B`) REFERENCES `Restaurant`(`restaurantId`) ON DELETE CASCADE ON UPDATE CASCADE;
