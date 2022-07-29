import { Request, Response } from "express";
import { DetahesClientesService } from "../../services/clientes/detalhesClientesService";


class DetahesClientesController{

    async handle(req: Request, res: Response){

        const cliente_id = req.query.cliente_id as string
        
        const detahesClientesService = new DetahesClientesService();
        
        const cliente = await detahesClientesService.execute({cliente_id})
        
        return res.json(cliente)

    }


}

export {DetahesClientesController}