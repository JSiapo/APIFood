import 'reflect-metadata';

import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, NODE_ENV } from './config';
import AuthRoute from './routes/auth.route';
import MenuRoutes from './routes/menu.routes';
import UserRoutes from './routes/user.route';

const helmet = require('helmet');
const app = express();
createConnection({
  type: 'postgres',
  host: DB_HOST,
  port: 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['dist/entity/**/*.js'],
  logging: false,
  synchronize: false,
  ssl: { rejectUnauthorized: false },
})
  .then()
  .catch((err: Error) => {
    throw err;
  });
//middlewares
const AuthToken = require('./middlewares/auth.middleware');
app.use(helmet());
app.use(cors());
app.use(AuthToken);

app.use(cors());
NODE_ENV == 'develop' ? app.use(morgan('dev')) : app.use(morgan('tiny'));
app.use(express.json());
app.all('/*', (req: Request, res: Response, next: Function) =>
  req.method === 'OPTIONS' ? res.status(200).end() : next()
);

app.use('/api', MenuRoutes);
app.use('/api', UserRoutes);
app.use('/api', AuthRoute);

app.get('/', function (req, res) {
  res.send('Food API');
});

function stop() {
  server.close();
}

let server = app.listen(process.env.PORT || 3001);
console.log('Server on port', 3001);
// export default app;
module.exports = app;
module.exports.stop = stop;
