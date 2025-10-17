import jwt from 'jsonwebtoken'

const jwtSecret: string = process.env.JWT_SECRET || ''