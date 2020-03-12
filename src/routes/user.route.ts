import { Router } from 'express';
const router = Router();

import {
  getUser,
  createUser,
  deleteUser,
  updateUser
} from '../controllers/user.controller';

router.get('/users/:email', getUser);
router.post('/new/user', createUser);
router.put('/users/:email', updateUser);
router.delete('/users/:email', deleteUser);

export default router;
