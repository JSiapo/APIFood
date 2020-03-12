const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { SECRET_TOKEN } from '../config';

export const login = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.body);
  if (req.body.email && req.body.password) {
    const user = await getRepository(User).findOne({
      email: req.body.email
    });
    const pass_encrypt = await bcrypt.compare(
      req.body.password,
      user?.password
    );
    if (pass_encrypt) {
      const payload = {
        username: user?.username,
        email: user?.email,
        role: user?.role,
        state: user?.state
      };
      const token = jwt.sign(payload, SECRET_TOKEN, { expiresIn: '1d' });
      return res.json({ token });
    } else {
      return res.status(404).json({ message: 'Password invaild' });
    }
  }
  return res.status(404).json({ message: 'Not found email' });
};
