import prismaClient from "../../prisma/prisma";

interface ClienteRequest{
    nome: string,
    telefone: string,
    cpf: string
}

class CriarClienteService{

    async execute({nome, telefone, cpf}: ClienteRequest){


        const cpfJaExiste = await prismaClient.cliente.findFirst({where:{
            cpf: cpf
        }})
        
        if(cpfJaExiste){
            throw new Error ("CPF já cadastrado");
        }

        const cliente = await prismaClient.cliente.create({
            data:{
                nome: nome,
                telefone: telefone,
                cpf: cpf,
            }
        })

        return cliente
    }


}

export {CriarClienteService}