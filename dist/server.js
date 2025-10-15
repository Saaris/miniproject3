import express from 'express';
import usersRouter from './routes/users.js';
const logger = (req, res, next) => {
    console.log(`${req.method}  ${req.url}`);
    next();
};
//konfiguration
const app = express();
const port = Number(process.env.PORT) || 1338;
//middlewares
app.use(express.static('/dist'));
app.use(express.json());
app.use('/', logger);
//router moduler
app.use('/api/users', usersRouter);
app.use('/api/register');
app.use('/api/signin');
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
//# sourceMappingURL=server.js.map