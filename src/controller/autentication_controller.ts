import { Schema } from 'mongoose';
import { Request, Response } from 'express';
import MAuthentication from '../schema/auth';
import * as Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import process from '../config/config';

export const addAuthentication = (req: Request, res: Response) => {
  try {
    req.body.password = Bcrypt.hashSync('' + req.body.password, 10);

    const auth = new MAuthentication(req.body);
    auth.save((err: any) => {
      if (err) {
        res.status(401).json(err);
      } else {
        res.status(201).json(auth);
      }
    });
  } catch (error) {
    res.status(401).json({
      message: 'Error la estructura del json no es correcta',
      json: { user: '', password: '' },
    });
  }
};

export const allAuthentication = (req: any, res: Response) => {
  const auth = MAuthentication.find((err: any, userAuth: any) => {
    if (err) {
      res.status(401).json(err);
    } else {
     res.status(200).json(userAuth);
    }
  });
};

export const findAuthUser = (req: Request, res: Response) => {
  const auth = MAuthentication.findOne(
    { user: req.body.user },
    (err: any, userAuth: any) => {
      if (err) {
        res.json({ err, ok: false });
      } else {
        if (!userAuth) {
          return res
            .status(400)
            .json({ message: 'El usuario no existe', ok: false });
        }
        if (!Bcrypt.compareSync('' + req.body.password, userAuth.password)) {
          return res
            .status(400)
            .json({
              message: 'El usuario o la  contraseña  es invalida',
              ok: false,
            });
        }
        userAuth.password = '';
        let token = jwt.sign({ auth: userAuth }, '' + process.env.SEED, {
          expiresIn: process.env.CADUCIDAD_TOKEN,
        });
        console.log(process.env.SEED);
        res.json({ token, auth: userAuth, ok: true });
      }
    }
  );
};

export const findAuthUserToken = (req: any, res: Response) => {
  const auth = MAuthentication.findOne(
    { user: req.auth.user },
    (err: any, userAuth: any) => {
      if (err) {
        res.json(err);
      } else {
        userAuth.password="";
        res.json(userAuth);
      }
    }
  );
};
