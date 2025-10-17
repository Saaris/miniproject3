// /api/register
// POST /, { username, password }  ← skapar en ny användare och loggar in denna

import { PutCommand} from '@aws-sdk/lib-dynamodb';
import express from 'express'
import type { Router, Response, Request} from 'express'
import { db } from '../data/dynamodb.js'
import { createToken } from '../data/authorization.js'
import type { UserBody, SigninResp } from '../data/types.js';

const tableName = 'jwt';

const router: Router = express.Router();


router.post('/', async (req: Request<{},SigninResp, UserBody>, res: Response<SigninResp>) => {
    const body: UserBody = req.body

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
    try {
        const result = await db.send(command)
        const token: string = createToken(`USER#${newId}`, 'user')
        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully',
            token: token 
        })

    } catch(error) {
        console.error('Registration error:', error)
        console.error('Error details:', (error as any)?.message)
        res.status(500).json({ 
            success: false,
            message: `Registration failed: ${(error as any)?.message || 'Unknown error'}`
        })
    }

})

export default router