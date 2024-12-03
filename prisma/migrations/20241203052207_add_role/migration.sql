/*
  Warnings:

  - Added the required column `filePath` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Made the column `storageUrl` on table `attachment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `attachment` ADD COLUMN `filePath` VARCHAR(191) NOT NULL,
    MODIFY `storageUrl` VARCHAR(191) NOT NULL;
