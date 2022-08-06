/*
  Warnings:

  - You are about to drop the column `agendamento_id` on the `clientes` table. All the data in the column will be lost.
  - Added the required column `cliente_id` to the `agendamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clientes" DROP CONSTRAINT "clientes_agendamento_id_fkey";

-- DropIndex
DROP INDEX "clientes_cpf_key";

-- DropIndex
DROP INDEX "users_cpf_key";

-- AlterTable
ALTER TABLE "agendamentos" ADD COLUMN     "cliente_id" TEXT NOT NULL,
ADD COLUMN     "draft" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "agendamento_id";

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
