import { PrismaClient } from '@prisma/client';
import prismaClient from '../../prisma/prisma';



interface AgendamentoRequest {
    data: string;
    horario: string;
    descricao: string
    cliente_id: string;
}


class CriarAgendamentosService {

    async execute({ data, horario, descricao, cliente_id }: AgendamentoRequest) {


        const agendamento = await prismaClient.agendamento.create({
            data: {
                data: data,
                horario: horario,
                descricao: descricao,
                cliente_id : cliente_id,
            }
        })

        return agendamento;
    }


}

export { CriarAgendamentosService }