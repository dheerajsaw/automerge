/*
  Warnings:

  - You are about to drop the column `assetUrl` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Asset` table. All the data in the column will be lost.
  - Added the required column `assetFileName` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "assetUrl",
DROP COLUMN "createAt",
ADD COLUMN     "assetFileName" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
