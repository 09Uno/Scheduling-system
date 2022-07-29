import { Request, Response } from "express";
import { CriarAgendamentosService } from "../../services/agendamentos/criarAgendamentosService";

class CriarAgendamentosController{      

    async handle(req:Request, res:Response){

        const {data, horario ,descricao, cliente_id  } = req.body

        const criarAgendamentosService = new CriarAgendamentosService()

        const agendamento = await criarAgendamentosService.execute({
                data,
                horario,
                descricao,
                cliente_id,
        })

        return res.json(agendamento)
    }


}

export {CriarAgendamentosController}