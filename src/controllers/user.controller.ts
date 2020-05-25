import 'moment/locale/es';

import { Request, Response } from 'express';
import moment from 'moment';
import { getRepository } from 'typeorm';

import { User } from '../entity/user.entity';
import IsEmail from '../utils/email';

moment.locale('es');

const TIME_FORMAT = 'MMMM Do YYYY, h:mm:ss a';

export const getUser = async (req: Request, res: Response): Promise<Response> =>
  req.query?.email
    ? IsEmail(req.query.email)
      ? await getRepository(User)
          .findOne({
            where: [{ email: req.query.email, state: true }],
          })
          .then((user) => res.status(200).json(user))
          .catch((err: Error) => res.status(401).send(err))
      : res.status(401).json({ message: 'Email invaild' })
    : req.query?.id
    ? await getRepository(User)
        .findOne({
          id: parseInt(req.query.id),
        })
        .then((user) => res.status(200).json(user))
        .catch((err: Error) => res.status(401).send(err))
    : await getRepository(User)
        .find({
          order: {
            id: 'ASC',
          },
        })
        .then((user) => res.status(200).json(user))
        .catch((err: Error) => {
          throw res.status(400).json({ message: err.message });
        });

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: User | undefined = await getRepository(User)
    .findOne({
      id: parseInt(req.params.id),
    })
    .then((user) => user);

  return user
    ? (req?.body?.email && IsEmail(req?.body?.email)) ||
      req.body?.username ||
      req.body?.password ||
      req.body?.role
      ? getRepository(User).merge(user, {
          email: req?.body?.email,
          username: req.body?.username,
          password: req.body?.password,
          role: req.body?.role,
        }) &&
        res.status(200).json(
          await getRepository(User)
            .save(user)
            .then()
            .catch((err: Error) => {
              throw res.status(400).json({ message: err.message });
            })
        )
      : res.status(400).json({ message: 'Complete correctly all params' })
    : res.status(204).send();
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: User | undefined = await getRepository(User)
    .findOne({
      where: [{ id: parseInt(req.params.id), state: true }],
    })
    .then((user) => user);

  return user
    ? getRepository(User).merge(user, {
        state: false,
      }) &&
        res.status(200).json(
          await getRepository(User)
            .save(user)
            .then()
            .catch((err: Error) => {
              throw res.status(400).json({ message: err.message });
            })
        )
    : res.status(204).send();
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const now = moment().format(TIME_FORMAT); // April 15th 2020, 12:47:38 am

  const userFound = await getRepository(User).findOne({
    email: req?.body?.email,
    username: req?.body?.username,
  });

  return req?.body?.email && IsEmail(req.body.email) && req.body?.password
    ? !userFound
      ? res.status(200).json(
          await getRepository(User)
            .save(
              getRepository(User).create({
                email: req?.body?.email,
                username: req?.body?.username,
                password: req?.body?.password,
                role: req?.body?.role,
                createdDay: now,
              })
            )
            .then()
            .catch((err: Error) => {
              throw res.status(400).json({ message: err.message });
            })
        )
      : res.status(200).json({ message: 'User exist' })
    : res.status(400).json({ message: 'Complete correctly all params' });
};
