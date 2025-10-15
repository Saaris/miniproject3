// /api/users  (alla endpoints kräver inloggning, svara annars med 401)
// DELETE /:id  ← tar bort användare
// PUT /:id  ← ändrar användarnamn och lösenord för en befintlig användare
// GET /  ← all info om specifik användare
// GET /  ← svarar med lista av användarnamn
import express from 'express';
import { DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
const router = express.Router();
export default router;
//# sourceMappingURL=users.js.map