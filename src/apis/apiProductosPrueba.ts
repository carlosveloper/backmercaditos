import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import * as ProductosController from '../controller/productosPrueba_controller';

const app: Application = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/productos', ProductosController.addProducto);


app.get('/productos', ProductosController.allProductos);


app.get('/misproductos/:id', ProductosController.allMisProductos);

app.post('/misproductos', ProductosController.addMisProductos);

export default app;
