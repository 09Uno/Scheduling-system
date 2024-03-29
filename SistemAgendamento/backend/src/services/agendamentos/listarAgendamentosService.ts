import prismaClient from "../../prisma/prisma";


class ListarAgendamentosService {

    async execute() {

        const agendamentos = await prismaClient.agendamento.findMany({
            where: {
                draft: true
            }, orderBy: 
                {
                    horario: 'asc',
                }
                
            
        })

        return agendamentos
    }


}

export { ListarAgendamentosService }