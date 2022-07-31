import { Request, Response } from "express";
import { ApagarAgendamentosService } from "../../services/agendamentos/apagarAgendamentoService";

class ApagarAgendamentosController{

    async handle(req:Request, res:Response){

        const agendamento_id = req.query.agendamento_id as string

        const apagarAgendamentoService = new ApagarAgendamentosService()

        const agendamento = await apagarAgendamentoService.execute({
            agendamento_id
        })

        return res.json(agendamento)

    }

}

export {ApagarAgendamentosController}