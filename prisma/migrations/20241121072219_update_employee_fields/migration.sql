/*
  Warnings:

  - The primary key for the `attachment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `eligibilityrecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `rolepermission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `userrole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `workexperience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `action` on the `workexperience` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `workexperience` table. All the data in the column will be lost.
  - You are about to drop the `appointmentdetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `educationalrecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `officeinfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spouse` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_rolepermissions` DROP FOREIGN KEY `_RolePermissions_A_fkey`;

-- DropForeignKey
ALTER TABLE `_rolepermissions` DROP FOREIGN KEY `_RolePermissions_B_fkey`;

-- DropForeignKey
ALTER TABLE `_user roles` DROP FOREIGN KEY `_User Roles_A_fkey`;

-- DropForeignKey
ALTER TABLE `_user roles` DROP FOREIGN KEY `_User Roles_B_fkey`;

-- DropForeignKey
ALTER TABLE `appointmentdetails` DROP FOREIGN KEY `AppointmentDetails_officeInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `attachment` DROP FOREIGN KEY `Attachment_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `educationalrecord` DROP FOREIGN KEY `EducationalRecord_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `eligibilityrecord` DROP FOREIGN KEY `EligibilityRecord_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `officeinfo` DROP FOREIGN KEY `OfficeInfo_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `parents` DROP FOREIGN KEY `Parents_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `rolepermission` DROP FOREIGN KEY `RolePermission_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `rolepermission` DROP FOREIGN KEY `RolePermission_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `spouse` DROP FOREIGN KEY `Spouse_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `userrole` DROP FOREIGN KEY `UserRole_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `userrole` DROP FOREIGN KEY `UserRole_userId_fkey`;

-- DropForeignKey
ALTER TABLE `workexperience` DROP FOREIGN KEY `WorkExperience_employeeId_fkey`;

-- AlterTable
ALTER TABLE `_rolepermissions` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_user roles` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `attachment` DROP PRIMARY KEY,
    ADD COLUMN `storageUrl` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `employeeId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `eligibilityrecord` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `employeeId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `employee` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `gender` VARCHAR(191) NULL,
    MODIFY `civilStatus` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `position` VARCHAR(191) NULL,
    MODIFY `department` VARCHAR(191) NULL,
    MODIFY `bio` TEXT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `permission` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `role` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `rolepermission` DROP PRIMARY KEY,
    MODIFY `roleId` VARCHAR(191) NOT NULL,
    MODIFY `permissionId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`roleId`, `permissionId`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `userrole` DROP PRIMARY KEY,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `roleId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`, `roleId`);

-- AlterTable
ALTER TABLE `workexperience` DROP PRIMARY KEY,
    DROP COLUMN `action`,
    DROP COLUMN `date`,
    ADD COLUMN `appointmentStatus` VARCHAR(191) NULL,
    ADD COLUMN `company` VARCHAR(191) NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `isGovernmentService` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `position` VARCHAR(191) NOT NULL,
    ADD COLUMN `salary` DOUBLE NULL,
    ADD COLUMN `salaryGrade` VARCHAR(191) NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `employeeId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `appointmentdetails`;

-- DropTable
DROP TABLE `educationalrecord`;

-- DropTable
DROP TABLE `officeinfo`;

-- DropTable
DROP TABLE `parents`;

-- DropTable
DROP TABLE `spouse`;

-- CreateTable
CREATE TABLE `FamilyBackground` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `spouseLastname` VARCHAR(191) NULL,
    `spouseFirstname` VARCHAR(191) NULL,
    `spouseMiddlename` VARCHAR(191) NULL,
    `spouseOccupation` VARCHAR(191) NULL,
    `spouseEmployer` VARCHAR(191) NULL,
    `spouseTelephone` VARCHAR(191) NULL,
    `spouseEmployerAddress` VARCHAR(191) NULL,
    `fatherLastname` VARCHAR(191) NULL,
    `fatherFirstname` VARCHAR(191) NULL,
    `fatherMiddlename` VARCHAR(191) NULL,
    `motherLastname` VARCHAR(191) NULL,
    `motherFirstname` VARCHAR(191) NULL,
    `motherMiddlename` VARCHAR(191) NULL,

    UNIQUE INDEX `FamilyBackground_employeeId_key`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OfficeDetails` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `plantilla` VARCHAR(191) NULL,
    `office` VARCHAR(191) NULL,
    `detailedTo` VARCHAR(191) NULL,
    `directLine` VARCHAR(191) NULL,
    `local` VARCHAR(191) NULL,
    `facsimile` VARCHAR(191) NULL,
    `salaryGrade` VARCHAR(191) NULL,
    `step` VARCHAR(191) NULL,
    `premiums` VARCHAR(191) NULL,
    `tin` VARCHAR(191) NULL,
    `gsis` VARCHAR(191) NULL,
    `phic` VARCHAR(191) NULL,
    `pagibig` VARCHAR(191) NULL,
    `umid` VARCHAR(191) NULL,
    `otherGovAgency` DATETIME(3) NULL,
    `dojAppointment` DATETIME(3) NULL,
    `presentPositionAppointment` DATETIME(3) NULL,
    `assumptionPresentPosition` DATETIME(3) NULL,
    `noGap` VARCHAR(191) NULL,
    `terminationDate` DATETIME(3) NULL,

    UNIQUE INDEX `OfficeDetails_employeeId_key`(`employeeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EducationRecord` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NULL,
    `yearGraduated` VARCHAR(191) NULL,
    `units` VARCHAR(191) NULL,
    `yearFrom` VARCHAR(191) NULL,
    `yearTo` VARCHAR(191) NULL,
    `honors` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrainingProgram` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `hours` INTEGER NULL,
    `conductor` VARCHAR(191) NULL,
    `venue` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reference` (
    `id` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NULL,
    `company` VARCHAR(191) NULL,
    `contactNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FamilyBackground` ADD CONSTRAINT `FamilyBackground_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OfficeDetails` ADD CONSTRAINT `OfficeDetails_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EducationRecord` ADD CONSTRAINT `EducationRecord_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EligibilityRecord` ADD CONSTRAINT `EligibilityRecord_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkExperience` ADD CONSTRAINT `WorkExperience_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrainingProgram` ADD CONSTRAINT `TrainingProgram_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reference` ADD CONSTRAINT `Reference_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_User Roles` ADD CONSTRAINT `_User Roles_A_fkey` FOREIGN KEY (`A`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_User Roles` ADD CONSTRAINT `_User Roles_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolePermissions` ADD CONSTRAINT `_RolePermissions_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolePermissions` ADD CONSTRAINT `_RolePermissions_B_fkey` FOREIGN KEY (`B`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
