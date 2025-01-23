-- DropForeignKey
ALTER TABLE `MenuItem` DROP FOREIGN KEY `MenuItem_menuId_fkey`;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE CASCADE ON UPDATE CASCADE;
