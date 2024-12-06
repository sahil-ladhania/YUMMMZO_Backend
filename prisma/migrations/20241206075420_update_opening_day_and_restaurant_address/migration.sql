/*
  Warnings:

  - You are about to alter the column `day` on the `OpeningDay` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to drop the column `restaurantAddressId` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `OpeningDay` MODIFY `day` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL;

-- AlterTable
ALTER TABLE `Restaurant` DROP COLUMN `restaurantAddressId`;
