import { Schema } from 'mongoose';
import { Request, Response } from 'express';
import MProducto from '../schema/productosPrueba';
import MMisProductos from '../schema/miproductosPrueba';

import process from '../config/config';

export const allProductos = (req: Request, res: Response) => {

    console.log("todos los productos");
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
      res.status(401).send(err);
      //     res.status(400).send(err);
    } else {
      // book.title="";
      res.status(201).send(book);
    }
  });
};



export const addMisProductos = (req: Request, res: Response) => {
  const book = new MMisProductos(req.body);
  book.save((err: any) => {
    if (err) {
      console.log(err.code);
      res.status(401).send(err);
      //     res.status(400).send(err);
    } else {
      // book.title="";
      res.status(201).send(book);
    }
  });
};


export const allMisProductos = (req: any, res: Response) => {
  
  const auth = MMisProductos.find(
    { auth: req.params.id },
    (err: any, productos: any) => {
      if (err) {
        res.status(401).json({ err, ok: false });
      } else {
        
        res.status(200).json(productos);
      }
    }
  );
};

