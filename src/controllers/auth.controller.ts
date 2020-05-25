const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import 'moment/locale/es';

import { Request, Response } from 'express';
import moment from 'moment';
import { getRepository } from 'typeorm';

import { SECRET_TOKEN, TOKEN_EXPIRE } from '../config';
import { User } from '../entity/user.entity';
import IsEmail from '../utils/email';

moment.locale('es');

const TIME_FORMAT = 'MMMM Do YYYY, h:mm:ss a';

//TODO check email 📧

export const login = async (req: Request, res: Response): Promise<Response> => {
  let lastConnection = moment().format(TIME_FORMAT); // April 15th 2020, 12:47:38 am

  if (req.body.email && req.body.password) {
    if (!IsEmail(req.body.email)) {
      return res.status(401).json({ message: 'Email invaild' });
    }
    try {
      const user = await getRepository(User)
        .findOne({
          email: req.body.email,
        })
        .then()
        .catch((err: Error) => {
          throw err;
        });
      const pass_encrypt = await bcrypt
        .compare(req.body.password, user?.password)
        .then()
        .catch((err: Error) => {
          throw err;
        });
      if (user && pass_encrypt) {
        const payload = {
          username: user?.username,
          email: user?.email,
          role: user?.role,
          state: user?.state,
        };
        await getRepository(User)
          .save({ ...user, lastConnection })
          .then()
          .catch((err: Error) => {
            throw err;
          });
        const token = jwt.sign(payload, SECRET_TOKEN, {
          expiresIn: TOKEN_EXPIRE,
        });

        return res.json({ token });
      } else {
        return res.status(401).json({ message: 'Password invaild' });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  return res.status(204).json({ message: 'Complete all params' });
};
