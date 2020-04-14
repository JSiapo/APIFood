import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import IsEmail from '../utils/email';

import { User } from '../entity/user.entity';
//TODO usar try catch para todas las consultas
export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!IsEmail(req.body.email)) {
    return res.status(401).json({ message: 'Email invaild' });
  }
  try {
    const user = await getRepository(User).findOne({
      email: req.query.email,
    });
    return res.json(user);
  } catch (error) {
    const keyError = error.message.split(' ')[0];
    return res.status(400).json({
      message: `${error.message}`,
      detail: `${error.detail}`,
      key: `${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`,
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!IsEmail(req.body.email)) {
    return res.status(401).json({ message: 'Email invaild' });
  }
  try {
    const user = await getRepository(User).findOne({
      email: req.params.id,
    });
    if (user) {
      getRepository(User).merge(user, req.body);
      const result = await getRepository(User).save(user);
      return res.json(result);
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

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!IsEmail(req.body.email)) {
      return res.status(401).json({ message: 'Email invaild' });
    }
    const user = await getRepository(User).findOne({
      email: req.params.id,
    });
    req.body.state = false;
    if (user) {
      getRepository(User).merge(user, req.body);
      const result = await getRepository(User).save(user);
      return res.json(result);
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

//TODO Agregar Navigator (return link get this user)
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!IsEmail(req.body.email)) {
    return res.status(401).json({ message: 'Email invaild' });
  }
  try {
    if (req.body.email && req.body.password) {
      const temp_user = req.body;
      try {
        const userfound = await getRepository(User).findOne({
          email: temp_user.email,
          username: temp_user.username,
        });
        if (userfound) {
          // temp_user.state = true;
          // getRepository(User).merge(userfound, temp_user);
          // const result = await getRepository(User).save(userfound);
          // return res.json({ result, message: 'Activate' });
          return res.status(400).json({
            message: 'User exist',
          });
        }
        const newuser = getRepository(User).create(temp_user);
        const results = await getRepository(User).save(newuser);
        return res.status(201).json({ results, message: 'Success' });
      } catch (error) {
        const keyError = error.message.split(' ')[0];
        return res.status(400).json({
          message: `${error.message}`,
          detail: `${error.detail}`,
          key: `${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`,
        });
      }
    }
    return res.status(204).json({ message: 'Not found' });
  } catch (error) {
    const keyError = error.message.split(' ')[0];
    return res.status(400).json({
      message: `${error.message}`,
      detail: `${error.detail}`,
      key: `${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`,
    });
  }
};
