import express, { Application, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import MUsuario from '../schema/usuario';
import * as ROLES from '../schema/roles';

// =====================
// Verifica Token
// =====================

export const verificaToken = (
  request: any,
  res: Response,
  next: NextFunction
) => {
  let token = request.get('token'); //Autorization
  console.log('---URL-----');
  console.log(request.url);

  jwt.verify('' + token, '' + process.env.SEED, (err: any, decoded: any) => {
    if (err) {
      return res.status(400).send({ message: 'Token invalido', err });
    }
    console.log('---AUTH----');
    request.auth = decoded.auth;
    console.log(request.auth);
    next();
  });
};

// =====================
// Verifica AdminRole
// =====================
export const verificaAdminRole = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let Idusuario = req.auth._id;

  
  const user = MUsuario.findOne(
    { auth: Idusuario },
    (err: any, usuario: any) => {
      if (err) {
        res.json({ err, ok: false, message: 'Posible error reference id' });
      } else {
        if (!usuario) {
          return res
            .status(400)
            .json({ message: 'El auth no existe', ok: false });
        }

        if (usuario.rol=== ROLES.rolesUsuarioValidos.values[0]) {
          next();
        } else {
          return res.json({
            ok: false,
            message: 'El usuario no es administrador',
          });
        }
      }
    }
  );
};
