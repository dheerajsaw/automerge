-- CreateEnum
CREATE TYPE "status" AS ENUM ('unMerged', 'merged');

-- AlterTable
ALTER TABLE "Changes" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'unMerged';
