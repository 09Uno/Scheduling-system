import { Request } from 'express';
import prismaClient from "../../prisma/prisma";

interface RequestAgendamento{
    agendamento_id : string
}

class DetalhesAgendamentoService{

    async execute({agendamento_id}:RequestAgendamento){

        const agendamento = await prismaClient.agendamento.findMany({
            where:{
                id: agendamento_id
            },select:{
                data: true,
                horario: true,
                descricao: true,
                cliente_id: true
            }
        })

        return agendamento
    }


}
export {DetalhesAgendamentoService}