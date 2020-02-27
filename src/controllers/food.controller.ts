import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Food } from '../entity/food.entity';

export const getFoods = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const foods = await getRepository(Food).find();
  return res.json(foods);
};
