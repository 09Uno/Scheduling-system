import prismaClient from "../../prisma/prisma";

interface ApagarAgendamentosRequest{
    agendamento_id: string
}

class ApagarAgendamentosService{

    async execute({agendamento_id}:ApagarAgendamentosRequest){

        const agendamento = await prismaClient.agendamento.delete({
            where:{
                id: agendamento_id
            }
        })

        return agendamento
    }

}

export {ApagarAgendamentosService}