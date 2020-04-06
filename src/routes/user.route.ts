import { Router } from 'express';
const router = Router();

import {
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from '../controllers/user.controller';

router.get('/users/', getUser);
router.post('/user/new', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
