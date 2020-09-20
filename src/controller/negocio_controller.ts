import { Schema } from 'mongoose';
import { Request, Response } from 'express';
import MNegocio from '../schema/negocios';
import process from '../config/config';

export const addNegocio = (req: Request, res: Response) => {
  const negocio = new MNegocio(req.body);
  negocio.save((err: any) => {
    if (err) {
      res
        .status(401)
        .json({ err, ok: false,});
    } else {
      res.status(201).json(negocio);
    }
  });
};
