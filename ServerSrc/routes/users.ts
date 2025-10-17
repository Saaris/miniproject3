// /api/users  (alla endpoints kräver inloggning, svara annars med 401)
// DELETE /:id  ← tar bort användare
// PUT /:id  ← ändrar användarnamn och lösenord för en befintlig användare
// GET /  ← all info om specifik användare
// GET /  ← svarar med lista av användarnamn


import express from 'express'
import type { Router, Response, Request} from 'express'
import { DeleteCommand, QueryCommand, GetCommand } from '@aws-sdk/lib-dynamodb'
import { db } from '../data/dynamodb.js'
import { requireAuth, tableName } from '../data/middleware.js'
import type { 
    User, 
    UserIdParam, 
    UserRes, 
    ErrorMessage, 
    GetUsersRes 
} from '../data/userTypes.js'

const router: Router = express.Router();

// Använd auth middleware på alla routes
router.use(requireAuth)


router.get('/', async (req: Request, res: Response<GetUsersRes | ErrorMessage>) =>  { 
  try {
    const result = await db.send(new QueryCommand({
      TableName: tableName,
      IndexName: undefined, // Använd main table
      FilterExpression: 'sk = :sk',
      ExpressionAttributeValues: {
        ':sk': 'PROFILE'
      }
    }));

    const users: User[] = result.Items?.map(item => ({
      pk: item.pk,
      sk: item.sk,
      username: item.username,
      meta: item.meta
    })) || [];

    res.status(200).json({ users }); 
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch users" 
    }); 
  }
});

// GET /:id - Hämta specifik användare
router.get('/:id', async (req: Request<UserIdParam>, res: Response<UserRes | ErrorMessage>) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          message: 'User ID is required' 
        });
      }

      // Formatera user ID
      const userId = id.startsWith('USER#') ? id : `USER#${id}`;

      const result = await db.send(new GetCommand({
        TableName: tableName,
        Key: { 
          pk: userId, 
          sk: 'PROFILE'
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
        id: result.Item.pk,
        username: result.Item.username,
        email: result.Item.meta?.email,
        accessLevel: result.Item.meta?.accessLevel,
        createdAt: result.Item.meta?.createdAt
      };

      res.status(200).json({ 
        success: true, 
        user: userInfo 
      }); 

    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch user' 
      }); 
    }
});

export default router