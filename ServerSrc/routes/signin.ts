import express from 'express'
import { QueryCommand} from '@aws-sdk/lib-dynamodb'
import { db } from '../data/dynamodb.js'
import type { Router, Response, Request} from 'express'
import type { UserBody, UserItem, SigninResp } from '../data/types.js'
import { createToken } from '../data/authorization.js'


const router: Router = express.Router();

const tableName = 'jwt';

//logga in
router.post('/', async (req: Request<{}, SigninResp | void, UserBody>, res: Response<SigninResp | void>) => {

	const body: UserBody = req.body
	console.log('body', body)

	const command = new QueryCommand({
		TableName: tableName,
		KeyConditionExpression: 'pk = :value',
		ExpressionAttributeValues: {
			':value': 'USER'
		}
	})
	const output = await db.send(command)
	if( !output.Items ) {
		console.log('No items from db')
		res.sendStatus(404)
		return
	}

	const users: UserItem[] = output.Items as UserItem[]
	const found: UserItem | undefined = users.find(user => user.username === body.username && user.password === body.password)
	if( !found ) {
		console.log('No matching user')
		res.sendStatus(401)
		return
	}

	const userId = found.sk.substring(5) 
	const accessLevel = found.accessLevel || 'user' // använd accessLevel från användaren
	const token: string = createToken(userId, accessLevel)
	res.send({ success: true, message: 'Login successful', token: token })
})

export default router