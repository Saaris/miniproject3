// /api/register
// POST /, { username, password }  ← skapar en ny användare och loggar in denna

import express from 'express'
import type { Router, Response, Request} from 'express'

const router: Router = express.Router();

interface PostRegister {
    username: string,
    password: string
}
interface PostResponse {
    success: boolean,
    token: string
}

router.post('/', async (req: Request<PostRegister>, res: Response<PostRegister>) => {
    

})
export default router