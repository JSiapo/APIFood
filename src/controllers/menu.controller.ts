import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Menu } from '../entity/menu.entity';

export const getMenus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const menus = await getRepository(Menu)
    .createQueryBuilder('menu')
    .leftJoinAndSelect('menu.food', 'food')
    .orderBy('menu.id', 'ASC')
    .getMany();
  return res.json(menus);
};

export const getMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // const results = await getRepository(Menu).findOne(req.params.id);
  const results = await getRepository(Menu)
    .createQueryBuilder('menu')
    .where('menu.id = :id', { id: req.params.id })
    .leftJoinAndSelect('menu.food', 'food')
    .getOne();
  if (results) {
    return res.json(results);
  } else {
    return res.status(204).json({ message: 'Not found' });
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

export const updateMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const food = await getRepository(Menu).findOne(req.params.id);
  if (food) {
    getRepository(Menu).merge(food, req.body);
    const results = await getRepository(Menu).save(food);
    return res.json(results);
  }
  return res.status(204).json({ msg: 'Not food found' });
};

export const deleteMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const food = await getRepository(Menu).findOne(req.params.id);
  req.body.state = false;
  if (food) {
    getRepository(Menu).merge(food, req.body);
    const results = await getRepository(Menu).save(food);
    return res.json(results);
  }
  return res.status(204).json({ msg: 'Not food found' });
};

// TODO Other controllers 🔥🔥🔥

export const getMenuday = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const results = await getRepository(Menu)
    .createQueryBuilder('menu')
    .where('menu.fecha = :fecha', { fecha: req.params.day })
    .leftJoinAndSelect('menu.food', 'food')
    .getMany();
  if (results) {
    return res.json(results);
  } else {
    return res.status(204).json({ message: 'Not found' });
  }
};
