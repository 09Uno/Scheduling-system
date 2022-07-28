import prismaClient from "../../prisma/prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

interface AutentificarRequest{
    user: string;
    senha: string;
}

class AutentificarUsuarioService{

    async execute({user, senha}:AutentificarRequest){

        const usuario = await prismaClient.usuario.findFirst({
            where:{
                user : user
            }
        })  
        if(!usuario){
            throw new Error("sem usuário!")
        }

        const verificarSenha = await compare(senha, usuario.senha)

        if(!verificarSenha){
            throw new Error("Usuário o Senha incorretos!")
        }

        const token = sign({
            nome: usuario.nome,
            user: usuario.user
        },
        process.env.JWT_SECRETE,
        {
            subject: usuario.id,
            expiresIn: '30d'
        }
        )
        
        return{
            id: usuario.id,
            nome: usuario.nome,
            user: usuario.user,
            token: token
        }

    }

}

export {AutentificarUsuarioService}