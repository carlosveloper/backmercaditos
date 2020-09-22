import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import connect from './service/conecct';
import * as BookController from './schema/book_controller';
import * as AuthController from './controller/autentication_controller';
import ApiAuth from './apis/apiAuth';
import ApiFile from './apis/apiFile';
import ApiUsuario from'./apis/apiUsuario';
import ApiCategoria from './apis/apiCategoria';
import ApiNegocio from './apis/apiNegocio';
import ApiProductos from './apis/apiProductos';
import SwaggerApi from './documentacion/SwaggerApis';



import process from './config/config'


const app: Application = express();

var port = process.env.PORT;
const db: string = ''+process.env.URLDB; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



/* app.use((req, res, next) => {
  res.status(404).send({ message: 'Not Found' });
}); */

/* app.get('*', (req, res) => {
  res.send({ error: 'No routes matched' });
  res.end();
}); */

/* app.all('*', (req, res) => {
  console.log('Hi, Stack Overflow!');
  res.send({
    success: false,
    status: 404,
    message: 'Invalid Uri Resource',
  });
});

 */

//Coneccion con MongoDb
connect(db);

app.get('/hola', (req: Request, res: Response, next: NextFunction) => {
  
  res.send('Hello World');
});



/* 
app.get('/books', BookController.allBooks);


app.get('/books/:id', BookController.showBook);

app.post('/books', BookController.addBook);

app.post('/booksautor', BookController.showBookAutor);

app.patch('/books/:id', BookController.updateBook);

app.delete('/books/:id', BookController.deleteBook);

 */
app.use(ApiAuth);
app.use(ApiFile);
app.use(ApiUsuario);
app.use(ApiCategoria);
app.use(ApiNegocio);
app.use(ApiProductos);
app.use(SwaggerApi);





app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    status: '404',
    message: 'Url no Found',
    path: req.url,
  });
});



app.use(function (error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof SyntaxError) {
    res.status(400).send({ message: 'Error de syntaxis en la petición' });
  } else {
    next();
  }
});



app.listen(port, () => {
  console.log(`Server running on ${port}`);
});



