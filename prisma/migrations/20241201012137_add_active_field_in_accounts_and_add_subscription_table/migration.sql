-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_subscription_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` DOUBLE NOT NULL,
    `created_at` VARCHAR(40) NULL,

    UNIQUE INDEX `subscriptions_external_subscription_id_key`(`external_subscription_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
