import { Router ,Request, Response } from 'express';


import { CriarUsuarioController } from './controllers/usuarios/criarUsuarioController';
import { AutentificarUsuarioController } from './controllers/usuarios/autentificarUsuarioController';
import { EstaAutentificado } from './middlewares/estaAutentificado';
import { CriarClienteController } from './controllers/clientes/criarClienteController';
import { DetalhesUsuarioController } from './controllers/usuarios/detalhesUsuariosController';
import { CriarAgendamentosController } from './controllers/agendamentos/criarAgendamentosController';
import { DetahesClientesController } from './controllers/clientes/detalhesClientesController';
import { DetalhesAgendamentoController } from './controllers/agendamentos/detalhesAgendamentosController';
import { ListarAgendamentosController } from './controllers/agendamentos/listarAgendamentosController';
import { ApagarAgendamentosController } from './controllers/agendamentos/apagarAgendamentosController';
import { listarClinentesController } from './controllers/clientes/listarClientesController';

const router = Router()

router.get('/teste2', (req: Request, res: Response)=>{
    return res.json({teste2:true})
})



router.post('/usuario', new CriarUsuarioController().handle )
router.get('/me', EstaAutentificado, new DetalhesUsuarioController().handle)
router.post('/autentificar', new AutentificarUsuarioController().handle)


router.get('/cliente', EstaAutentificado ,new DetahesClientesController().handle)
router.post('/cliente',EstaAutentificado , new CriarClienteController().handle)
router.get('/cliente/listar', EstaAutentificado, new listarClinentesController().handle)

router.post('/agendar', EstaAutentificado, new CriarAgendamentosController().handle)
router.get('/agendar/detalhes', EstaAutentificado ,new DetalhesAgendamentoController().handle)
router.get('/agendar/listar', EstaAutentificado, new ListarAgendamentosController().handle)
router.delete('/agendar', EstaAutentificado, new ApagarAgendamentosController().handle)


export {router}