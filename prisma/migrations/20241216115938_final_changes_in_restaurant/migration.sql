/*
  Warnings:

  - You are about to drop the column `deliveryTime` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `ratings` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `totalReviews` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the `RestaurantAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `area` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buildingNumber` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorNumber` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nearbyLandmark` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `RestaurantAddress` DROP FOREIGN KEY `RestaurantAddress_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `Restaurant` DROP COLUMN `deliveryTime`,
    DROP COLUMN `ratings`,
    DROP COLUMN `totalReviews`,
    ADD COLUMN `area` VARCHAR(500) NOT NULL,
    ADD COLUMN `buildingNumber` VARCHAR(50) NOT NULL,
    ADD COLUMN `city` VARCHAR(100) NOT NULL,
    ADD COLUMN `country` VARCHAR(100) NOT NULL,
    ADD COLUMN `floorNumber` VARCHAR(50) NOT NULL,
    ADD COLUMN `nearbyLandmark` VARCHAR(200) NOT NULL,
    ADD COLUMN `postalCode` INTEGER NOT NULL,
    ADD COLUMN `state` VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE `RestaurantAddress`;
