import { PrismaClient } from '@prisma/client';
import prismaClient from '../../prisma/prisma';


class ListarClientesService{

    async execute() {
        

        const clientes = await prismaClient.cliente.findMany({
          where:{

          }, orderBy:{
            nome: 'asc'
          }
        })

        return clientes
    }


}

export {ListarClientesService}