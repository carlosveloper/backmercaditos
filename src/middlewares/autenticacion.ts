import express, { Application, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

////
//// Verificar Token
////

export const verificaToken = (
  request: any,
  res: Response,
  next: NextFunction
) => {
  let token = request.get('token'); //Autorization
  console.log('---URL-----');
  console.log(request.url);

  jwt.verify('' + token, '' + process.env.SEED, (err: any, decoded: any) => {
    if (err) {
      return res.status(400).send({ message: 'Token invalido', err });
    }
    console.log('---AUTH----');
    request.auth = decoded.auth;
    console.log(request.auth);
    next();
  });
};
