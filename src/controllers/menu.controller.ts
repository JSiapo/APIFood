import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Menu } from '../entity/menu.entity';

export const getMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (req.query.day) {
      // Other controllers 🔥🔥🔥
      const results = await getRepository(Menu)
        .createQueryBuilder('menu')
        .where('menu.fecha = :fecha', { fecha: req.query.day })
        .leftJoinAndSelect('menu.food', 'food')
        .getMany();
      if (results) {
        return res.json(results);
      } else {
        return res.status(204).json({ message: 'Not found' });
      }
    }
    if (req.query.id) {
      // const results = await getRepository(Menu).findOne(req.query.id);
      const results = await getRepository(Menu)
        .createQueryBuilder('menu')
        .where('menu.id = :id', { id: req.query.id })
        .leftJoinAndSelect('menu.food', 'food')
        .getOne();
      if (results) {
        return res.json(results);
      } else {
        return res.status(204).json({ message: 'Not found' });
      }
    } else {
      const menus = await getRepository(Menu)
        .createQueryBuilder('menu')
        .leftJoinAndSelect('menu.food', 'food')
        .orderBy('menu.id', 'ASC')
        .getMany();
      return res.json(menus);
    }
  } catch (error) {
    const keyError = error.message.split(' ')[0];
    return res.status(400).json({
      message: `${error.message}`,
      detail: `${error.detail}`,
      key: `${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`,
    });
  }
};

export const createMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newFood = getRepository(Menu).create(req.body);
    const results = await getRepository(Menu).save(newFood);
    return res.json(results);
  } catch (error) {
    const keyError = error.message.split(' ')[0];
    return res.status(400).json({
      message: `${error.message}`,
      detail: `${error.detail}`,
      key: `${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`,
    });
  }
};

export const updateMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const food = await getRepository(Menu).findOne(req.params.id);
    if (food) {
      getRepository(Menu).merge(food, req.body);
      const results = await getRepository(Menu).save(food);
      return res.json(results);
    }
    return res.status(204).json({ message: 'Not food found' });
  } catch (error) {
    const keyError = error.message.split(' ')[0];
    return res.status(400).json({
      message: `${error.message}`,
      detail: `${error.detail}`,
      key: `${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`,
    });
  }
};

export const deleteMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const food = await getRepository(Menu).findOne(req.params.id);
    req.body.state = false;
    if (food) {
      getRepository(Menu).merge(food, req.body);
      const results = await getRepository(Menu).save(food);
      return res.json(results);
    }
    return res.status(204).json({ message: 'Not food found' });
  } catch (error) {
    const keyError = error.message.split(' ')[0];
    return res.status(400).json({
      message: `${error.message}`,
      detail: `${error.detail}`,
      key: `${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`,
    });
  }
};
