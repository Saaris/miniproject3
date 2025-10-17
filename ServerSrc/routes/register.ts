// /api/register
// POST /, { username, password }  ← skapar en ny användare och loggar in denna

import { PutCommand } from '@aws-sdk/lib-dynamodb';
import express from 'express'
import type { Router, Response, Request} from 'express'
// import type { UserItem } from '../data/types.js';

const tableName = 'jwt-table';

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
    const body: PostRegister = req.body

    const newId = crypto.randomUUID()

    const command = new PutCommand({
        TableName: tableName,
        Item: {
            ...body,
            accessLevel: 'user',
            pk: 'USER',
            sk: 'USER#' + newId
        }


    })

})
export default router