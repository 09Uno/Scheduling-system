import prismaClient from "../../prisma/prisma";

interface ListarAgendamentosRequest{
    data: string
}


class ListarAgendamentosService{

    async execute({data}: ListarAgendamentosRequest){

        const agendamentos = await prismaClient.agendamento.findMany({
            where:{
                data : data
            },orderBy:{   
                horario: 'asc',
            }
        })

        return agendamentos
    }
    

}

export {ListarAgendamentosService}