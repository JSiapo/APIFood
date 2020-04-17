const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { getRepository, AdvancedConsoleLogger } from 'typeorm';
import { User } from '../entity/user.entity';
import { SECRET_TOKEN, TOKEN_EXPIRE } from '../config';
import IsEmail from '../utils/email';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const TIME_FORMAT = 'MMMM Do YYYY, h:mm:ss a';

//TODO check email 📧

export const login = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.body);
  let lastConnection = moment().format(TIME_FORMAT); // April 15th 2020, 12:47:38 am
  if (req.body.email && req.body.password) {
    if (!IsEmail(req.body.email)) {
      return res.status(401).json({ message: 'Email invaild' });
    }
    try {
      const user = await getRepository(User).findOne({
        email: req.body.email,
      });
      const pass_encrypt = await bcrypt.compare(
        req.body.password,
        user?.password
      );
      if (user && pass_encrypt) {
        const payload = {
          username: user?.username,
          email: user?.email,
          // role: user?.role,
          state: user?.state,
        };
        const token = jwt.sign(payload, SECRET_TOKEN, {
          expiresIn: TOKEN_EXPIRE,
        });
        getRepository(User).merge(user, { ...user, lastConnection });
        await getRepository(User).save({ ...user, lastConnection });
        return res.json({ token });
      } else {
        return res.status(401).json({ message: 'Password invaild' });
      }
    } catch (error) {
      const keyError = error.message.split(' ')[0];
      return res.status(400).json({
        message: `${error.message}`,
        detail: `${error.detail}`,
        key: `${keyError.charAt(0).toUpperCase() + keyError.slice(1)}`,
      });
    }
  }
  return res.status(204).json({ message: 'Not found email' });
};
