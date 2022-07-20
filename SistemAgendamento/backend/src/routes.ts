import { Router ,Request, Response } from 'express';


import { CriarUsuarioController } from './controllers/usuarios/criarUsuarioController';
import { AutentificarUsuarioController } from './controllers/usuarios/autentificarUsuarioController';

const router = Router()

router.get('/teste2', (req: Request, res: Response)=>{
    return res.json({teste2:true})
})

router.post('/usuario', new CriarUsuarioController().handle )

router.post('/autentificar', new AutentificarUsuarioController().handle)

export {router}