import { hash } from "bcryptjs";
import prismaClient from "../../prisma/prisma";

interface usuarioRequest{
    nome: string;
    user: string;
    cpf: string;
    senha: string;
} 


class CriarUsuarioService{

    async execute({nome, user, cpf, senha}: usuarioRequest){

        if(!user){
            throw new Error("Usuário inválido!")
        }

        const JaExiste = await prismaClient.usuario.findFirst({where:{
            user: user
        }})

        if(JaExiste){
            throw new Error("Usuário já utilizado!")
        }

        const cpfJaExiste = await prismaClient.usuario.findFirst({where:{
            cpf:cpf
        }})

        if(cpfJaExiste){
            throw new Error("Cpf já cadastrado!")
        }

        const hashSenha = await hash(senha, 8)

        const usuario = await prismaClient.usuario.create({
            data:{
                nome: nome,
                user: user,
                cpf: cpf,
                senha: hashSenha,
            }, select :{
                id: true,
                nome: true,
                cpf: true,
            }
        
        })

        return usuario
    }




}

export {CriarUsuarioService}