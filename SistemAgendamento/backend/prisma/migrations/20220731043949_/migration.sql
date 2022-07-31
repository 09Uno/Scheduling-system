/*
  Warnings:

  - The `horario` column on the `agendamentos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "agendamentos" DROP COLUMN "horario",
ADD COLUMN     "horario" TIME(6);
