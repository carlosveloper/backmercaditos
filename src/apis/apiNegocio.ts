import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import * as NegocioController from '../controller/negocio_controller';
import * as VerificaToken from '../middlewares/autenticacion';

const app: Application = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/negocio', VerificaToken.verificaToken, NegocioController.addNegocio);


export default app;
