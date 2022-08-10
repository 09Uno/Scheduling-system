import { ListarClientesService } from "../../services/clientes/listarClinentesService";
import { Request, Response } from "express";

class listarClinentesController{

    async handle(req: Request,res: Response ){

        const listarClientesService = new ListarClientesService()

        const clientes = await listarClientesService.execute()


        return res.json(clientes)
    }



}

export {listarClinentesController}