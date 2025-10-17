import express from 'express'
import type { RequestHandler, Express, Request, Response } from 'express'
import usersRouter from './routes/users.js'
import registerRouter from './routes/register.js'
import signinRouter from './routes/signin.js'
import { requireAuth } from './data/middleware.js'


const logger: RequestHandler = (req, res, next) => {
	console.log(`${req.method}  ${req.url}`)
	next()
}
//konfiguration
const app: Express = express()
const port: number = Number(process.env.PORT) || 1338

//middlewares
app.use(express.static('/dist'))
app.use(express.json())
app.use('/', logger)

//router moduler (dessa kräver INTE auth)
app.use('/api/register', registerRouter)  
app.use('/api/signin', signinRouter)      

// Auth middleware för skyddade routes
app.use('/api', requireAuth)

// Skyddade routes (kräver auth)
app.use('/api/users', usersRouter)      


app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})