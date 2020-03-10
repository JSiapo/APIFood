import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import helmet from 'helmet';
import dontSniffMimetype from 'dont-sniff-mimetype';
import frameguard from 'frameguard';
import xssFilter from 'x-xss-protection';

// Don't allow me to be in ANY frames:
import FoodRoutes from './routes/food.route';
import MenuRoutes from './routes/menu.routes';

const app = express();
createConnection();

//middlewares
app.use(cors());
app.use(helmet()); //Secure 🔒
app.use(xssFilter({ mode: null })); //Secure 🔒
app.use(dontSniffMimetype()); //Secure 🔒
app.use(frameguard({ action: 'deny' })); //Secure 🔒
app.use(morgan('dev'));
app.use(express.json());
app.disable('x-powered-by');

app.use(FoodRoutes);
app.use(MenuRoutes);

app.listen(process.env.PORT || 3001);

app.get('/', function(req, res) {
  res.send('Food API');
});

console.log('Server on port', 3001);

export default app;
