import prismaClient from '../../prisma/prisma';



interface AgendamentoRequest {
    horario: Date ;
    descricao: string;
    cliente_id: string;
}


class CriarAgendamentosService {

    async execute({  horario, descricao, cliente_id }: AgendamentoRequest) {


        const agendamento = await prismaClient.agendamento.create({
            data: {
                horario: horario,
                descricao: descricao,
                cliente_id : cliente_id,
            }
        })

        return agendamento;
    }


}

export { CriarAgendamentosService }