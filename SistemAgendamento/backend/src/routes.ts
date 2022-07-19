import { Router ,Request, Response } from 'express';

const router = Router()

router.get('/teste2', (req: Request, res: Response)=>{
    return res.json({teste2:true})
})
export {router}