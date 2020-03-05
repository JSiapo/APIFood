import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';

import FoodRoutes from './routes/food.route';
import MenuRoutes from './routes/menu.routes';

const app = express();
createConnection();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(FoodRoutes);
app.use(MenuRoutes);

app.listen(process.env.PORT || 3001);

console.log('Server on port', 3001);

export default app;
