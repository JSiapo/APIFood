import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Menu } from '../entity/menu.entity';

export const getMenus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const menus = await getRepository(Menu).find();
  console.log(menus);
  return res.json(menus);
};

export const getMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const results = await getRepository(Menu).findOne(req.params.id);
  console.log(results);
  if (results) {
    return res.json(results);
  } else {
    return res.json({ message: 'Not found' });
  }
};

export const createMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newFood = getRepository(Menu).create(req.body);
  const results = await getRepository(Menu).save(newFood);
  return res.json(results);
};
