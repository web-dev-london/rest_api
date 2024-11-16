/*
  Warnings:

  - The primary key for the `Restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Menu` DROP FOREIGN KEY `Menu_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `MenuItem` DROP FOREIGN KEY `MenuItem_menuId_fkey`;

-- AlterTable
ALTER TABLE `Restaurant` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Menu`;

-- DropTable
DROP TABLE `MenuItem`;
