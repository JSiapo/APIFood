import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';

import FoodRoutes from './routes/food.route';

const app = express();
createConnection();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(FoodRoutes);
app.set(`port`, process.env.PORT || 8080);

// app.listen(3001);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server on port ${app.get(`port`)}`);
});
