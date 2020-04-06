const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { SECRET_TOKEN, TOKEN_EXPIRE } from '../config';

export const login = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.body);
  if (req.body.email && req.body.password) {
    try {
      const user = await getRepository(User).findOne({
        email: req.body.email,
      });
      console.log(req.query);
      const pass_encrypt = await bcrypt.compare(
        req.body.password,
        user?.password
      );
      if (pass_encrypt) {
        const payload = {
          username: user?.username,
          email: user?.email,
          role: user?.role,
          state: user?.state,
        };
        const token = jwt.sign(payload, SECRET_TOKEN, {
          expiresIn: TOKEN_EXPIRE,
        });
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
