import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import { SECRET_TOKEN } from '../config';

module.exports = function (req: Request, res: Response, next: Function) {
  const path = req.path;
  if (path != '/api/login' && path != '/' && path != '/api/user/new') {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, SECRET_TOKEN, function (error: any, decoded: any) {
        if (error)
          return res.status(401).send({
            message: "You don't have access",
            error,
          });
        if (req.method != 'GET') {
          //Validar 🔑
          if (decoded.role == 'guest') next();
          else
            res.status(401).send({
              message: "You don't have access.",
            });
        } else {
          next();
        }
      });
    } else
      res.status(401).send({
        message: "You don't have access.",
      });
  } else {
    next();
  }
};