-- CreateTable
CREATE TABLE `emergency_contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` INTEGER NULL,
    `name` VARCHAR(100) NOT NULL,
    `residential_phone` VARCHAR(20) NULL,
    `cellphone` VARCHAR(20) NOT NULL,
    `relationship` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NULL,

    INDEX `person_id`(`person_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `insurance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` INTEGER NULL,
    `has_assurance` BOOLEAN NOT NULL,
    `ars_name` VARCHAR(100) NULL,
    `ars_cardholder` VARCHAR(100) NULL,
    `ars_primary_insured` VARCHAR(100) NULL,
    `ars_plan` VARCHAR(100) NULL,
    `ars_contract_number` VARCHAR(50) NULL,
    `ars_primary_insured_relationship` VARCHAR(50) NULL,

    INDEX `person_id`(`person_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `visit_date` VARCHAR(50) NULL,
    `reason` VARCHAR(255) NOT NULL,
    `diagnosis` VARCHAR(255) NULL,
    `treatment` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL DEFAULT 0,

    INDEX `patient_id`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `account_owner` INTEGER NOT NULL,

    INDEX `account_admin_ibfk_1`(`account_id`),
    INDEX `account_admin_ibfk_2_idx`(`admin_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `client_id` INTEGER NOT NULL,

    INDEX `account_client_ibfk_2`(`client_id`),
    INDEX `account_client_ibfk_1`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `created_at` VARCHAR(40) NULL,
    `admin_id` INTEGER NULL,
    `account_key` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `account_key_UNIQUE`(`account_key`),
    INDEX `accounts_ibfk_1_idx`(`admin_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `marital_status` ENUM('single', 'married', 'divorced', 'widowed', 'minor') NULL,
    `birth_date` VARCHAR(150) NOT NULL,
    `birth_place` VARCHAR(150) NULL,
    `nationality` VARCHAR(100) NULL,
    `religion` VARCHAR(100) NULL,
    `occupation` VARCHAR(100) NULL,
    `document_id` VARCHAR(50) NOT NULL,
    `address` VARCHAR(255) NULL,
    `residential_phone` VARCHAR(20) NULL,
    `cellphone` VARCHAR(20) NOT NULL,
    `client_number` VARCHAR(10) NULL,

    UNIQUE INDEX `client_number_UNIQUE`(`client_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50) NULL,
    `last_name` VARCHAR(50) NULL,
    `email` VARCHAR(255) NULL,
    `created_at` VARCHAR(40) NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `emergency_contact` ADD CONSTRAINT `emergency_contact_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `insurance` ADD CONSTRAINT `insurance_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `visits` ADD CONSTRAINT `visits_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `account_admin` ADD CONSTRAINT `account_admin_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `account_admin` ADD CONSTRAINT `account_admin_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `account_client` ADD CONSTRAINT `account_client_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `account_client` ADD CONSTRAINT `account_client_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
