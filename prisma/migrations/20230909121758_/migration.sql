-- CreateTable
CREATE TABLE `Character` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `species` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `originName` VARCHAR(191) NOT NULL,
    `originLink` VARCHAR(191) NOT NULL,
    `locationName` VARCHAR(191) NOT NULL,
    `locationLink` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
