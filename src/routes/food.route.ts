import { Router } from 'express';
const router = Router();

import { getFoods } from '../controllers/food.controller';

router.get('/foods', getFoods);

export default router;
