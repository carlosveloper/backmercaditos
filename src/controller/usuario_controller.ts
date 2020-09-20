import { Schema } from 'mongoose';
import { Request, Response } from 'express';
import MUsuario from '../schema/usuario';
import process from '../config/config';

export const addUser = (req: Request, res: Response) => {
  const user = new MUsuario(req.body);
  user.save((err: any) => {
    if (err) {
      res
        .status(401)
        .json({ err, ok: false });
    } else {
      res.status(201).json(user);
    }
  });
};

export const getUserToken = (req: any, res: Response) => {
  const auth = MUsuario.findOne(
    { auth: req.auth._id },
    (err: any, usuario: any) => {
      if (err) {
        res.status(401).json(err);
      } else {
        res.status(200).json(usuario);
      }
    }
  );
};

export const getUserID = (req: any, res: Response) => {
  let id = req.query.id;
 

  const auth = MUsuario.findOne(
    { auth: req.query.id },
    (err: any, usuario: any) => {
      if (err) {
        res
          .status(401)
          .json({ err, ok: false });
      } else {
        if (!usuario) {
          return res
            .status(400)
            .json({ message: 'El usuario no existe', ok: false });
        }
        res.status(200).json({ usuario, ok: true });
      }
    }
  );
};
