// /api/register
// POST /, { username, password }  ← skapar en ny användare och loggar in denna

import express from 'express'
import type { Router, Response, Request} from 'express'

const router: Router = express.Router();


export default router