import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import * as ProductosController from '../controller/productos_controller';
import * as VerificaToken from '../middlewares/autenticacion';

const app: Application = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/productos',VerificaToken.verificaToken, ProductosController.addProducto);


app.get('/productos',VerificaToken.verificaToken,  ProductosController.allProductos);

app.get('/productos/:id',VerificaToken.verificaToken, ProductosController.allProductosNegocio);

app.get('/productos/search/:name',VerificaToken.verificaToken, ProductosController.allProductosNegocioSearch);



export default app;
