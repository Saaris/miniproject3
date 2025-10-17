// /api/register
// POST /, { username, password }  ← skapar en ny användare och loggar in denna

import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import express from 'express'
import type { Router, Response, Request} from 'express'
import { db } from '../data/dynamodb.js'
import { createToken } from '../data/authorization.js'

const tableName = 'jwt';

const router: Router = express.Router();

interface PostRegister {
    username: string;
    password: string;
 
}

interface PostResponse {
    success: boolean;
    message: string;
    token?: string;
}

router.post('/', async (req: Request<{},PostResponse, PostRegister>, res: Response<PostResponse>) => {
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