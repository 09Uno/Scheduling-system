/*
  Warnings:

  - You are about to drop the column `data` on the `agendamentos` table. All the data in the column will be lost.
  - The `horario` column on the `agendamentos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "agendamentos" DROP COLUMN "data",
DROP COLUMN "horario",
ADD COLUMN     "horario" TIMESTAMP(4);
