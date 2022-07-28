import { Request, Response } from 'express';
import { CriarClienteService } from "../../services/clientes/criarClienteServise";

class CriarClienteController{

    async handle(req: Request, res: Response){

        const {nome, telefone, cpf} = req.body
        
        const criarClienteService = new CriarClienteService()

        const cliente = await criarClienteService.execute({
            nome,
            telefone,
            cpf
        })


        return res.json(cliente)
    }


}

export {CriarClienteController}