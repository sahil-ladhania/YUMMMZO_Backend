/*
  Warnings:

  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_ratingId_fkey`;

-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_userId_fkey`;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `parentId` INTEGER NULL,
    MODIFY `ratingId` INTEGER NULL;

-- DropTable
DROP TABLE `Reply`;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_ratingId_fkey` FOREIGN KEY (`ratingId`) REFERENCES `Rating`(`ratingId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Comment`(`commentId`) ON DELETE SET NULL ON UPDATE CASCADE;
