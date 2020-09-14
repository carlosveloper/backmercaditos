import { Schema } from 'mongoose';
import { Request, Response } from 'express';
import MNegocio from '../schema/negocios';
import process from '../config/config';

export const addNegocio = (req: Request, res: Response) => {
  const negocio = new MNegocio(req.body);
  negocio.save((err: any) => {
    if (err) {
      console.log(err.code);
      res
        .status(401)
        .json({ err, ok: false,});
    } else {
      console.log(negocio);
      res.status(201).json(negocio);
    }
  });
};
