/*
  Warnings:

  - You are about to drop the column `cliente_id` on the `agendamentos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agendamento_id` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "agendamentos" DROP CONSTRAINT "agendamentos_cliente_id_fkey";

-- AlterTable
ALTER TABLE "agendamentos" DROP COLUMN "cliente_id";

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "agendamento_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_agendamento_id_fkey" FOREIGN KEY ("agendamento_id") REFERENCES "agendamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
