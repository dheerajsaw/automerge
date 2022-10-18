/*
  Warnings:

  - The values [unMerged,merged] on the enum `status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "status_new" AS ENUM ('UNMERGED', 'MERGED');
ALTER TYPE "status" RENAME TO "status_old";
ALTER TYPE "status_new" RENAME TO "status";
DROP TYPE "status_old";
COMMIT;
