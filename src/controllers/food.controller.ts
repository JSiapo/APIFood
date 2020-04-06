import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Food } from '../entity/food.entity';

export const getFood = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.query.id) {
      const foods = await getRepository(Food).find();
      return res.json(foods);
    } else {
      const results = await getRepository(Food).findOne(req.query.id);
      if (results) {
        return res.json(results);
      } else {
        return res.status(204).json({ message: 'Not found' });
      }
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

export const createFood = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newFood = getRepository(Food).create(req.body);
    const results = await getRepository(Food).save(newFood);
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

export const updateFood = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const food = await getRepository(Food).findOne(req.params.id);
    if (food) {
      getRepository(Food).merge(food, req.body);
      const results = await getRepository(Food).save(food);
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

export const deleteFood = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const food = await getRepository(Food).findOne(req.params.id);
    req.body.state = false;
    if (food) {
      getRepository(Food).merge(food, req.body);
      const results = await getRepository(Food).save(food);
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
