import { Router } from 'express';
const router = Router();

import {
  getMenus,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenuday
} from '../controllers/menu.controller';

router.get('/menus', getMenus);
router.get('/menus/:id', getMenu);
router.post('/menus', createMenu);
router.put('/menus/:id', updateMenu);
router.delete('/menus/:id', deleteMenu);
router.get('/menus_day/:day', getMenuday);

export default router;
