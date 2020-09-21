import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import * as NegocioController from '../controller/negocio_controller';
import * as VerificaToken from '../middlewares/autenticacion';

const app: Application = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/negocio', VerificaToken.verificaToken, NegocioController.addNegocio);


app.get('/negocio',VerificaToken.verificaToken, NegocioController.allNegocios);


app.get('/negocio/:id',VerificaToken.verificaToken, NegocioController.allMisNegocios);



app.get(
  '/negocio/categoria/:id',
  VerificaToken.verificaToken,
  NegocioController.allNegociosCategoria
);

export default app;
