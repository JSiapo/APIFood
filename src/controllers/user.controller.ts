import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../entity/user.entity';

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(User).findOne({
    email: req.body.email
  });
  return res.json(user);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(User).findOne({
    email: req.body.email
  });
  if (user) {
    getRepository(User).merge(user, req.body);
    const result = await getRepository(User).save(user);
    return res.json(result);
  }
  return res.json({ msg: 'Not food found' });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(User).findOne({
    email: req.body.email
  });
  req.body.state = false;
  if (user) {
    getRepository(User).merge(user, req.body);
    const result = await getRepository(User).save(user);
    return res.json(result);
  }
  return res.json({ msg: 'Not food found' });
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (req.body.email && req.body.password) {
    const temp_user = req.body;
    const userfound = await getRepository(User).findOne({
      email: temp_user.email
    });
    if (userfound) {
      temp_user.state = true;
      getRepository(User).merge(userfound, temp_user);
      const result = await getRepository(User).save(userfound);
      return res.json({ result, message: 'Activate' });
    }

    const newuser = getRepository(User).create(temp_user);
    const results = await getRepository(User).save(newuser);
    return res.json({ results, message: 'Success' });
  }
  return res.status(204).send('Not found');
};
