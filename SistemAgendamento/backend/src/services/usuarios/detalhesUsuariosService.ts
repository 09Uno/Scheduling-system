import prismaClient from "../../prisma/prisma";


class DetalhesUsuarioService{
    async execute(user_id: string){

        const usuario = await prismaClient.usuario.findFirst({
            where:{
                id : user_id  
            
            },select:{
                id: true,
                nome: true,
                user:true,
                cpf: true
                }
            })
        return usuario

    }
}

export {DetalhesUsuarioService}