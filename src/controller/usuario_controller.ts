import { Schema } from 'mongoose';
import { Request, Response } from 'express';
import MUsuario from '../schema/usuario';
import process from '../config/config';





export const addUser = (req: Request, res: Response) => {
  
    const user = new MUsuario(req.body);
    user.save((err: any) => {
      if (err) {
        console.log(err.code);
        res.status(401).json(err);
      } else {
        console.log(user);
        res.status(201).json(user);
      }
    });

  
};


export const getUserID = (req: any, res: Response) => {
   const auth = MUsuario.findOne(
     { auth: req.auth._id},
     (err: any, usuario: any) => {
       if (err) {
         res.json(err);
       } else {
         res.json(usuario);
       }
     }
   );
};