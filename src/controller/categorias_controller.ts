import { Schema } from 'mongoose';
import { Request, Response } from 'express';
import MCategoriaNegocio from '../schema/categoriaNegocio';
import MCategoriaProducto from '../schema/categoriaProducto';
import process from '../config/config';

export const addCategoria = (req: Request, res: Response) => {
  let tipo = req.query.tipo;
  var categoria: any;

  if (tipo === 'NEGOCIO') {
    categoria = new MCategoriaNegocio(req.body);
  } else if (tipo === 'PRODUCTO') {
    categoria = new MCategoriaProducto(req.body);
  } else {
    res.status(401).json({
      message: 'El Tipo de categoria es invalida',
      ok: false,
    });
  }

  categoria.save((err: any) => {
    if (err) {
      res.status(401).json({
        err,
        ok: false,
        message: 'Posible error reference id',
      });
    } else {
      res.status(201).json(categoria);
    }
  });
};

export const allCategoria = (req: Request, res: Response) => {
  let tipo = req.query.tipo;
  console.log('entre');
  if (tipo === 'NEGOCIO') {
    MCategoriaNegocio.find((err: any, categoria: any) => {
      if (err) {
        console.log(err);
        res.status(401).json(err);
      } else {
        res.status(200).json(categoria);
      }
    });
  } else if (tipo === 'PRODUCTO') {
    MCategoriaProducto.find((err: any, categoria: any) => {
      if (err) {
        console.log(err);
        res.status(401).json(err);
      } else {
        res.status(200).json(categoria);
      }
    });
  } else {
    res.status(401).json({
      message: 'El Tipo de categoria es invalida',
      ok: false,
    });
  }
};
