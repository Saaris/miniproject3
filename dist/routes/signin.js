// /api/signin
// POST /, { username, password }  ← loggar in en existerande användare
import express from 'express';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { db } from '../data/dynamodb.js';
import { createToken } from '../data/authorization.js';
const router = express.Router();
const tableName = 'jwt';
//logga in
router.post('/', async (req, res) => {
    const body = req.body;
    console.log('body', body);
    const command = new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: 'pk = :value',
        ExpressionAttributeValues: {
            ':value': 'USER'
        }
    });
    const output = await db.send(command);
    if (!output.Items) {
        console.log('No items from db');
        res.sendStatus(404);
        return;
    }
    const users = output.Items;
    const found = users.find(user => user.username === body.username && user.password === body.password);
    if (!found) {
        console.log('No matching user');
        res.sendStatus(401);
        return;
    }
    // vi har hittat en användare
    // sk = 'USER#id'
    const userId = found.sk.substring(5);
    const accessLevel = found.accessLevel || 'user'; // använd accessLevel från användaren
    const token = createToken(userId, accessLevel);
    res.send({ success: true, message: 'Login successful', token: token });
});
export default router;
//# sourceMappingURL=signin.js.map