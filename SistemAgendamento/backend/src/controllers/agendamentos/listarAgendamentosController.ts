import { Request, Response } from "express";
import { ListarAgendamentosService } from "../../services/agendamentos/listarAgendamentosService";

class ListarAgendamentosController{

    async handle(req: Request, res: Response){


        const listarAgendamentosService = new ListarAgendamentosService();

        const listar = await listarAgendamentosService.execute()


        return res.json(listar)


    }
    
}

export {ListarAgendamentosController}