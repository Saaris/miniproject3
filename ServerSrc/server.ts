import express from 'express'
import type { RequestHandler, Express, Request, Response } from 'express'


const logger: RequestHandler = (req, res, next) => {
	console.log(`${req.method}  ${req.url}`)
	next()
}
//konfiguration
const app: Express = express()
const port: Number(process.env.PORT) || 1339

//middlewares
app.use(express.static('/dist'))
app.use(express.json())
app.use('/', logger)

//router moduler
app.use('/api/users', userRouter)