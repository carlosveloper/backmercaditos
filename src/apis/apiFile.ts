import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import * as VerificaToken from '../middlewares/autenticacion';
import fileUpload from 'express-fileupload';
import * as UploadController from '../controller/upload_file_controller';

const app: Application = express();
app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
    // tempFileDir: '/tmp/',
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/upload/:tipo/:id', UploadController.uploadProfile);
export default app;
/*hola 2*/
