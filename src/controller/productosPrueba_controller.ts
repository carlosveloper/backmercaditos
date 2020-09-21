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


export const addProducto= (req: Request, res: Response) => {
  const book = new MProducto(req.body);
  book.save((err: any) => {
    if (err) {
      console.log(err.code);
      res.status(401).json(err);
    } else {
      res.status(201).json(book);
    }
  });
};




