import prismaClient from "../../prisma/prisma";


class DetahesClientesService{

   async execute(cliente_id: string){

        const cliente = await prismaClient.cliente.findFirst({
            where:{
                id: cliente_id 
            },select:{
                id: true,
                nome: true,
                telefone: true,
                cpf: true,

            }
        })
        return cliente;
    }   

}

export {DetahesClientesService}