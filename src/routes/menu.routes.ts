import { Router } from 'express';
const router = Router();

import {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} from '../controllers/menu.controller';

router.get('/menus/', getMenu);
router.post('/menus/', createMenu);
router.put('/menus/:id', updateMenu);
router.delete('/menus/:id', deleteMenu);

export default router;
