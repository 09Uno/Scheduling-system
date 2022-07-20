import { Request, Response } from "express";

import { CriarUsuarioService } from "../../services/usuarios/criarUsuarioService";

class CriarUsuarioController{

    async handle(req: Request, res: Response){

        const {nome, user, cpf, senha} = req.body

        const criarUsuarioService = new CriarUsuarioService()

        const usuario = await criarUsuarioService.execute({
            nome,
            user, 
            cpf, 
            senha,
        })

        return res.json(usuario)
    }


}

export {CriarUsuarioController}