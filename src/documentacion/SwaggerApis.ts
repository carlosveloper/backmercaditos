import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import m2s from 'mongoose-to-swagger';
import swaggerUi from 'swagger-ui-express';
import * as SwaggerAuth from './SwaggerAuth';

import MAuthentication from '../schema/auth';
import MUsuario from '../schema/usuario';
import MNegocio from '../schema/negocios';

const app: Application = express();
app.use(bodyParser.json());

app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup({
    swagger: '2.0',
    info: {
      version: '1.0.0',
      title: 'Mercaditos',
      description: 'Backend Proyecto Beta Mercaditos ',
      license: {
        name: 'Mercadittos',
        url: 'https://carlosveloper.com/#/',
      },
    },
    host: 'localhost:5000',
    basePath: '/',
    tags: [
      {
        name: 'Auth',
        description: 'API para los usuarios del sistema',
      },
    ],
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      JWT: {
        type: 'apiKey',
        name: 'token',
        in: 'header',
      },
    },
    paths: {
      '/auth': SwaggerAuth.addAuthentication,
      '/auth/': SwaggerAuth.allAuthentication,
      '/authToken': SwaggerAuth.findAuthUserToken,
      '/authFind': SwaggerAuth.findAuthUser,
    },
    definitions: {
      Auth: m2s(MAuthentication),
      Usuario: m2s(MUsuario),
      Negocio: m2s(MNegocio),
    },
  })
);

export default app;
