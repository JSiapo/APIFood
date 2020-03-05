import { Router } from 'express';
const router = Router();

import {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood
} from '../controllers/food.controller';

router.get('/foods', getFoods);
router.get('/foods/:id', getFood);
router.post('/foods', createFood);
router.put('/foods/:id', updateFood);
router.delete('/foods/:id', deleteFood);

export default router;
