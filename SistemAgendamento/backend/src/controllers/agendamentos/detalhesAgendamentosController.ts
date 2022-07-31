import { Request, Response } from "express";
import { DetalhesAgendamentoService } from "../../services/agendamentos/detalhesAgendamentosService";


class DetalhesAgendamentoController{

    async handle(req: Request, res: Response){

        const agendamento_id = req.query.agendamento_id as string

        const detalhesAgendamentoService = new DetalhesAgendamentoService()

        const agendamento = await detalhesAgendamentoService.execute({agendamento_id})

        return res.json(agendamento)
    }

}

export {DetalhesAgendamentoController}