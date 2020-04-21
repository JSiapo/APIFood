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
        return res.json({
          results,
          length_active: results.reduce(
            (acc: number, menu: Menu) => (menu.state ? acc + 1 : acc),
            0
          ),
          length: results.length,
        });
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
    // Check food exist in menu
    let foodNew: Menu = req.body;
    const foodFound: Array<Menu> = await getRepository(Menu)
      .createQueryBuilder('menu')
      .where('menu.fecha = :fecha', { fecha: req.body.fecha })
      .leftJoinAndSelect('menu.food', 'food')
      .getMany();
    const ff: Menu = foodFound.find(
      (food: Menu) => food.food.id === req.body.food
    )!;
    /*Se encontró el menú en el día 🍲 */
    if (typeof ff !== 'undefined') {
      getRepository(Menu).merge(ff, { ...ff, state: true });
      const results = await getRepository(Menu).save(ff);
      return res.status(201).json(results);
    } else {
      const newFood = getRepository(Menu).create(foodNew);
      const results = await getRepository(Menu).save(newFood);
      return res.status(201).json(results);
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

export const updateMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const food = await getRepository(Menu).findOne(req.params.id);
    if (food) {
      getRepository(Menu).merge(food, req.body);
      const results = await getRepository(Menu).save(food);
      return res.status(201).json(results);
    }
    return res.status(404).json({ message: 'Not food found' });
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
    if (food) {
      getRepository(Menu).merge(food, { ...food, state: false });
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
