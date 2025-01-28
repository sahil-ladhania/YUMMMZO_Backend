-- AlterTable
ALTER TABLE `Order` ADD COLUMN `restaurantAddress` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `userAddress` VARCHAR(191) NOT NULL DEFAULT '';
