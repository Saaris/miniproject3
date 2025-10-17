import express from 'express';
import { DeleteCommand, ScanCommand, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { db } from '../data/dynamodb.js';
import { tableName } from '../data/middleware.js';
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const result = await db.send(new ScanCommand({
            TableName: tableName,
            FilterExpression: 'pk = :pk',
            ExpressionAttributeValues: {
                ':pk': 'USER'
            }
        }));
        const users = result.Items?.map((item) => ({
            pk: item.pk,
            sk: item.sk,
            username: item.username,
            meta: item.meta || {
                passwordHash: item.password || '', // fallback för gamla format
                accessLevel: item.accessLevel || 'user',
                createdAt: new Date().toISOString()
            }
        })) || [];
        res.status(200).json({ users });
    }
    catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
});
// GET /:id - Hämta specifik användare
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }
        // Formatera user ID - sk innehåller 'USER#id'
        const sortKey = id.startsWith('USER#') ? id : `USER#${id}`;
        const result = await db.send(new GetCommand({
            TableName: tableName,
            Key: {
                pk: 'USER', // Alla användare har pk = 'USER'
                sk: sortKey // sk = 'USER#uuid'
            }
        }));
        if (!result.Item) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        // Returnera användarinfo (utan lösenord)
        const userInfo = {
            id: result.Item.sk, // sk innehåller 'USER#uuid'
            username: result.Item.username,
            email: result.Item.meta?.email || result.Item.email,
            accessLevel: result.Item.meta?.accessLevel || result.Item.accessLevel,
            createdAt: result.Item.meta?.createdAt || new Date().toISOString()
        };
        res.status(200).json({
            success: true,
            user: userInfo
        });
    }
    catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user'
        });
    }
});
export default router;
//# sourceMappingURL=users.js.map