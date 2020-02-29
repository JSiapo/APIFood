import { Router } from 'express';
const router = Router();

import {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood
} from '../controllers/food.controller';

router.get('/', (req, res) => {
  res.send('Hola');
});
router.get('/foods', getFoods);
router.get('/foods/:id', getFood);
router.post('/foods', createFood);
router.put('/foods/:id', updateFood);
router.delete('/Foods/:id', deleteFood);

export default router;
