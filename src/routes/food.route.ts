import { Router } from 'express';
const router = Router();

import {
  getFood,
  createFood,
  updateFood,
  deleteFood,
} from '../controllers/food.controller';

router.get('/foods/', getFood);
router.post('/foods/', createFood);
router.put('/foods/:id', updateFood);
router.delete('/foods/:id', deleteFood);

export default router;
