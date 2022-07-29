import prismaClient from "../../prisma/prisma";


interface RequestClientes{
    cliente_id: string
}


class DetahesClientesService{

    

   async execute({cliente_id}: RequestClientes){


        const cliente = await prismaClient.cliente.findUnique({
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