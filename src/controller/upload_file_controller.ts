import { Schema } from 'mongoose';
import { Request, Response } from 'express';
import process from '../config/config';

import fileUpload from 'express-fileupload';

export const uploadProfile = (req: any, res: Response) => {
  if (!req.files) {
    return res.status(400).json({ message: 'Ningun archivo se ha enviado' });
  }

  let tipo = req.params.tipo;
  let id = req.params.id;

  let archivo = req.files.archivo;
  let nombreCortado = archivo.name.split('.');
  let extension = nombreCortado[nombreCortado.length - 1];

  // Extensiones permitidas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      message:
        'Las extensiones permitidas son ' + extensionesValidas.join(', '),
      ext: extension,
    });
  }

  let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;



  
  archivo.mv(`upload/${nombreArchivo}`, (err: any) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    return res.status(400).json({ message: 'ok' });
  });




};
