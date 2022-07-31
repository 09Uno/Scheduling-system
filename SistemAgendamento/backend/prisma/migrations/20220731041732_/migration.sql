/*
  Warnings:

  - The `data` column on the `agendamentos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "agendamentos" DROP COLUMN "data",
ADD COLUMN     "data" DATE;
