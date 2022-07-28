import { Router ,Request, Response } from 'express';


import { CriarUsuarioController } from './controllers/usuarios/criarUsuarioController';
import { AutentificarUsuarioController } from './controllers/usuarios/autentificarUsuarioController';
import { EstaAutentificado } from './middlewares/estaAutentificado';
import { CriarClienteController } from './controllers/clientes/criarClienteController';
import { DetalhesUsuarioController } from './controllers/usuarios/detalhesUsuariosController';
import { CriarAgendamentosController } from './controllers/agendamentos/criarAgendamentosController';

const router = Router()

router.get('/teste2', (req: Request, res: Response)=>{
    return res.json({teste2:true})
})



router.post('/usuario', new CriarUsuarioController().handle )

router.post('/autentificar', new AutentificarUsuarioController().handle)

router.post('/cliente', EstaAutentificado, new CriarClienteController().handle)

router.get('/detalhes/usuario', EstaAutentificado, new DetalhesUsuarioController().handle)

router.post('/agendar', new CriarAgendamentosController().handle)

export {router}