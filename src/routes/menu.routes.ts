import { Router } from 'express';
const router = Router();

import { getMenus, getMenu, createMenu } from '../controllers/menu.controller';

router.get('/menus', getMenus);
router.get('/menus/:id', getMenu);
router.post('/menus', createMenu);

export default router;
