import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import * as AuthController from '../controller/autentication_controller';
import * as VerificaToken from '../middlewares/autenticacion';

const app: Application = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//////
app.post('/auth', AuthController.addAuthentication);

app.get('/auth', VerificaToken.verificaToken, AuthController.allAuthentication);


app.get('/authToken', VerificaToken.verificaToken, AuthController.findAuthUserToken);


app.post('/authFind', AuthController.findAuthUser);

export default app;
