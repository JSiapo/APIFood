import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import { SECRET_TOKEN } from '../config';
import { User } from '../entity/user.entity';

module.exports = function (req: Request, res: Response, next: Function) {
  const path = req.path;
  if (path != '/api/login' && path != '/') {
    if (req.headers.authorization) {
      let token = req?.headers?.authorization?.split(' ')[1];
      jwt.verify(token, SECRET_TOKEN, function (error: any, decoded: User) {
        if (error)
          return res.status(401).send({
            message: `You don't have access${error}`,
          });
        if (req.method != 'GET') {
          //TODO Validar 🔑
          if (decoded.role == 'guest') next();
          else
            res.status(401).send({
              message: "You don't have access. No guest",
            });
        } else {
          next();
        }
      });
    } else
      res.status(401).send({
        message: "You don't have access. not token found",
      });
  } else {
    next();
  }
};
