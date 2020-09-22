import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import * as UsuarioController from '../controller/usuario_controller';
import * as VerificaToken from '../middlewares/autenticacion';



const app: Application = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.post('/user',VerificaToken.verificaToken, UsuarioController.addUser);

app.get('/userToken', VerificaToken.verificaToken, UsuarioController.getUserToken);

app.get('/userID', VerificaToken.verificaToken, UsuarioController.getUserID);


export default app;



