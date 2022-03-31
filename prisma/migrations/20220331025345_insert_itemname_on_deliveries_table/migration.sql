/*
  Warnings:

  - Added the required column `item_name` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "item_name" TEXT NOT NULL;
