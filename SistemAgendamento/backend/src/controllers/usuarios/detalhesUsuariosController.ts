import { Request, Response } from "express";
import { DetalhesUsuarioService } from "../../services/usuarios/detalhesUsuariosService";


class DetalhesUsuarioController{
    async handle(req: Request, res: Response){

        const user_id = req.user_id

        const detalhesUsuariosService = new DetalhesUsuarioService()

        const detalhes = await detalhesUsuariosService.execute(user_id)

        return res.json(detalhes)

    }
}
export {DetalhesUsuarioController}