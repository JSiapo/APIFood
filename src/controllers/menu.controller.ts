import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Menu } from '../entity/menu.entity';

export const getMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let response: Menu[] | { foods: Menu[]; lenght: number } | {} | undefined;
  req?.query?.day &&
    (response = await getRepository(Menu)
      .findAndCount({ where: [{ state: true, fecha: req.query.day }] })
      .then((result) => {
        return { foods: result[0], lenght: result[1] };
      })
      .catch((err: Error) => {
        throw res.status(404).send(err.message);
      }));
  req?.query?.id &&
    (response = await getRepository(Menu)
      .findOne({ id: parseInt(req.query.id) })
      .then((foods) => (foods ? foods : {}))
      .catch((err: Error) => {
        throw res.status(404).send(err.message);
      }));
  !req?.query?.id &&
    !req?.query?.day &&
    (response = await getRepository(Menu)
      .findAndCount({ where: [{ state: true }] })
      .then(async (result) => {
        return { foods: result[0], lenght: result[1] };
      })
      .catch((err: Error) => {
        throw res.status(404).send(err.message);
      }));
  return res.status(200).json(response);
};

export const createMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const menuFind: Menu | undefined = await getRepository(Menu).findOne({
    where: [{ state: true, fecha: req?.body?.fecha, food: req?.body?.food }],
  });
  const menu = new Menu();
  menu.fecha = req?.body?.fecha;
  menu.food = req?.body?.food;

  return req?.body?.fecha && req?.body?.food
    ? !menuFind || menuFind.state === false
      ? (await getRepository(Menu)
          .save(getRepository(Menu).create(menu))
          .then()
          .catch((err: Error) => {
            throw res.status(400).json({ message: err.message });
          })) && res.status(201).json({ message: 'Created' })
      : res.status(200).json({ message: 'Menu exist' })
    : res.status(400).send();
};

export const updateMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const menuFind: Menu | undefined = await getRepository(Menu).findOne({
    where: [{ state: true, id: req?.params?.id }],
  });
  // const params = req.body?.fecha === undefined || req.body?.food === undefined;
  // console.log(params);
  return menuFind
    ? req.body?.fecha || req.body?.food
      ? getRepository(Menu).merge(menuFind, {
          fecha: req.body?.fecha,
          food: req.body?.food,
        }) &&
        res.status(200).json(
          await getRepository(Menu)
            .save(menuFind)
            .then()
            .catch((err: Error) => {
              throw res.status(400).json({ message: err.message });
            })
        )
      : res.status(400).send({ message: 'Complete all params' })
    : res.status(400).send({ message: 'No menu found or deleted' });
};

export const deleteMenu = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const menuFind: Menu | undefined = await getRepository(Menu).findOne({
    where: [{ state: true, id: req?.params?.id }],
  });

  return menuFind
    ? getRepository(Menu).merge(menuFind, {
        state: false,
      }) &&
        res.status(200).json(
          await getRepository(Menu)
            .save(menuFind)
            .then()
            .catch((err: Error) => {
              throw res.status(400).json({ message: err.message });
            })
        )
    : res.status(400).send();
};
