// /api/signin
// POST /, { username, password }  ← loggar in en existerande användare
import express from 'express'
import type { Router, Response, Request} from 'express'

const router: Router = express.Router();


export default router