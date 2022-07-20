import { Request, Response } from "express";

import { AutentificarUsuarioService } from "../../services/usuarios/autentificarUsuarioService";

class AutentificarUsuarioController{

    async handle(req: Request, res: Response){

        const {user, senha} = req.body 

        const autentificarUsuarioService = new AutentificarUsuarioService();

        const autentificar = await autentificarUsuarioService.execute({
            user,
            senha
        })

        return res.json(autentificar)
    }

}

export {AutentificarUsuarioController}