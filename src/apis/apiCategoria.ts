import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import * as CategoriaController from '../controller/categorias_controller';
import * as VerificaToken from '../middlewares/autenticacion';

const app: Application = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  '/categoria',
  [VerificaToken.verificaToken, VerificaToken.verificaAdminRole],
  CategoriaController.addCategoria
);

app.get(
  '/categoria',
  VerificaToken.verificaToken,
  CategoriaController.allCategoria
);

export default app;
