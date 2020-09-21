import { Schema } from 'mongoose';
import { Request, Response } from 'express';
import MProducto from '../schema/productos';

import process from '../config/config';

export const allProductos = (req: Request, res: Response) => {
  const productos = MProducto.find((err: any, productos: any) => {
    if (err) {
      console.log(err);
      res.status(401).json(err);
    } else {
      res.status(200).json(productos);
    }
  });
};

export const addProducto = (req: Request, res: Response) => {
  const producto = new MProducto(req.body);
  producto.save((err: any) => {
    if (err) {
      console.log(err.code);
      res.status(401).json(err);
    } else {
      res.status(201).json(producto);
    }
  });
};

export const allProductosNegocio = (req: any, res: Response) => {
  const productos = MProducto.find(
    { negocio: req.params.id },
    (err: any, productos: any) => {
      if (err) {
        res.status(401).json({ err, ok: false });
      } else {
        res.status(200).json(productos);
      }
    }
  );
};

export const allProductosNegocioSearch = (req: any, res: Response) => {
  const productos = MProducto.find(
    {
      $or: [
        {
          nombre: {
            $regex: new RegExp(req.params.name, 'ig'),
          },
        },
        {
          descripcion: {
            $regex: new RegExp(req.params.name, 'ig'),
          },
        },
      ],
    },
    (err: any, productos: any) => {
      if (err) {
        res.status(401).json({ err, ok: false });
      } else {
        res.status(200).json(productos);
      }
    }
  );
};
