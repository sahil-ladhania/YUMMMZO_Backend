-- CreateTable
CREATE TABLE `Permission` (
    `permissionId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Permission_name_key`(`name`),
    PRIMARY KEY (`permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolePermission` (
    `rolePermissionId` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('CUSTOMER', 'VENDOR', 'COURIER', 'ADMIN') NOT NULL,
    `permissionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`rolePermissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAddress` (
    `userAddressId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `buildingNumber` VARCHAR(50) NOT NULL,
    `floorNumber` VARCHAR(50) NOT NULL,
    `apartment` VARCHAR(500) NOT NULL,
    `area` VARCHAR(500) NOT NULL,
    `nearbyLandmark` VARCHAR(200) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `postalCode` INTEGER NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `addressType` ENUM('HOME', 'OFFICE', 'OTHER') NOT NULL DEFAULT 'HOME',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userAddressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cuisine` (
    `cuisineId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `cuisineType` ENUM('NORTH_INDIAN', 'PURE_VEG', 'BIRYANI', 'PIZZAS', 'BURGER', 'ROLLS', 'CAKES', 'DOSA', 'CHINESE', 'CHOLE_BHATURE', 'SHAKES', 'PASTRY', 'PARATHA', 'POORI', 'PASTA', 'PAV_BHAJI', 'RASGULLA', 'NOODLES', 'IDLI', 'ICE_CREAM') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Cuisine_name_key`(`name`),
    PRIMARY KEY (`cuisineId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OpeningDay` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` VARCHAR(191) NOT NULL,
    `restaurantId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurant` (
    `restaurantId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `restaurantName` VARCHAR(200) NOT NULL,
    `ownerName` VARCHAR(200) NOT NULL,
    `ownerEmail` VARCHAR(100) NOT NULL,
    `ownerPhoneNumber` VARCHAR(191) NOT NULL,
    `restaurantImage` VARCHAR(191) NOT NULL,
    `isPureVeg` BOOLEAN NOT NULL DEFAULT false,
    `priceForTwo` INTEGER NOT NULL,
    `deliveryTime` INTEGER NOT NULL,
    `totalReviews` INTEGER NOT NULL DEFAULT 0,
    `ratings` DOUBLE NOT NULL DEFAULT 0,
    `openingTime` VARCHAR(191) NOT NULL,
    `closingTime` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `restaurantAddressId` INTEGER NOT NULL,

    UNIQUE INDEX `Restaurant_ownerEmail_key`(`ownerEmail`),
    PRIMARY KEY (`restaurantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestaurantAddress` (
    `restaurantAddressId` INTEGER NOT NULL AUTO_INCREMENT,
    `restaurantId` INTEGER NOT NULL,
    `buildingNumber` VARCHAR(50) NOT NULL,
    `floorNumber` VARCHAR(50) NOT NULL,
    `area` VARCHAR(500) NOT NULL,
    `nearbyLandmark` VARCHAR(200) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `postalCode` INTEGER NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`restaurantAddressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `menuId` INTEGER NOT NULL AUTO_INCREMENT,
    `restaurantId` INTEGER NOT NULL,
    `menuName` VARCHAR(200) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`menuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuItem` (
    `itemId` INTEGER NOT NULL AUTO_INCREMENT,
    `menuId` INTEGER NOT NULL,
    `itemName` VARCHAR(200) NOT NULL,
    `itemDescription` VARCHAR(500) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `isVeg` BOOLEAN NOT NULL DEFAULT false,
    `isBestSeller` BOOLEAN NOT NULL DEFAULT false,
    `itemImage` VARCHAR(191) NOT NULL,
    `totalReviews` INTEGER NOT NULL DEFAULT 0,
    `ratings` DOUBLE NOT NULL DEFAULT 0,
    `itemCategory` ENUM('MAIN_COURSE', 'APPETIZER', 'DESSERT', 'BEVERAGE', 'SIDE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`itemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CuisineToRestaurant` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CuisineToRestaurant_AB_unique`(`A`, `B`),
    INDEX `_CuisineToRestaurant_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`permissionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD CONSTRAINT `UserAddress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OpeningDay` ADD CONSTRAINT `OpeningDay_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`restaurantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestaurantAddress` ADD CONSTRAINT `RestaurantAddress_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`restaurantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`restaurantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CuisineToRestaurant` ADD CONSTRAINT `_CuisineToRestaurant_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cuisine`(`cuisineId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CuisineToRestaurant` ADD CONSTRAINT `_CuisineToRestaurant_B_fkey` FOREIGN KEY (`B`) REFERENCES `Restaurant`(`restaurantId`) ON DELETE CASCADE ON UPDATE CASCADE;
