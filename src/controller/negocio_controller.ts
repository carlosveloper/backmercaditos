import { Schema } from 'mongoose';
import { Request, Response } from 'express';
import MNegocio from '../schema/negocios';
import process from '../config/config';

export const addNegocio = (req: Request, res: Response) => {
  const negocio = new MNegocio(req.body);
  negocio.save((err: any) => {
    if (err) {
      res.status(401).json({ err, ok: false });
    } else {
      res.status(201).json(negocio);
    }
  });
};


export const allNegocios = (req: Request, res: Response) => {
  const negocio = MNegocio.find((err: any, negocio: any) => {
    if (err) {
      res.status(401).json({ err, ok: false });
    } else {
      res.status(200).json(negocio);
    }
  });
};



export const allMisNegocios = (req: any, res: Response) => {
  const negocio = MNegocio.find(
    { auth: req.params.id },
    (err: any, negocios: any) => {
      if (err) {
        res.status(401).json({ err, ok: false });
      } else {
        res.status(200).json(negocios);
      }
    }
  );
};



export const allNegociosCategoria = (req: any, res: Response) => {
  const negocio = MNegocio.find(
    {cateNego: req.params.id },
    (err: any, negocios: any) => {
      if (err) {
        res.status(401).json({ err, ok: false });
      } else {
        res.status(200).json(negocios);
      }
    }
  );
};
