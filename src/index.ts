import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
const helmet = require('helmet');
import { createConnection } from 'typeorm';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV } from './config';

import FoodRoutes from './routes/food.route';
import MenuRoutes from './routes/menu.routes';
import UserRoutes from './routes/user.route';
import AuthRoute from './routes/auth.route';

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
  synchronize: true,
  ssl: true,
});
const AuthToken = require('./middlewares/auth.middleware');
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(AuthToken);

//middlewares
app.use(cors());
NODE_ENV == 'develop' ? app.use(morgan('dev')) : app.use(morgan('tiny'));
app.use(express.json());

app.use(FoodRoutes);
app.use(MenuRoutes);
app.use(UserRoutes);
app.use(AuthRoute);

app.listen(process.env.PORT || 3001);

app.get('/', function (req, res) {
  res.send('Food API');
});

console.log('Server on port', 3001);
// export default app;
module.exports = app;
