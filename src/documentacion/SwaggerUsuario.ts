export const addUser = {
  post: {
    tags: ['Usuario'],
    summary: 'Registro datos usuario',
    parameters: [
      {
        name: 'Datos Usuario',
        in: 'body',
        description: 'El campo auth es la relacion del id con la tabla AUTH',
        schema: {
          properties: {
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            fotoPerfil: { type: 'string' },
            rol: { type: 'string' },
            direccion: { type: 'string' },
            lat: { type: 'string' },
            lng: { type: 'string' },
            correo: { type: 'string' },
            auth: { type: 'string' },
          },
        },
      },
    ],
    responses: {
      '201': {
        description: 'OK',
        schema: {
          $ref: '#/definitions/Usuario',
        },
      },
    },
  },
};

export const allAuthentication = {
  get: {
    tags: ['Auth'],
    summary: 'Consulta todos los Auth',
    parameters: [],
    responses: {
      '200': {
        description: 'OK',
        schema: {
          $ref: '#/definitions/Auth',
        },
      },
    },
    security: [
      {
        JWT: [],
      },
    ],
  },
};

export const findAuthUserToken = {
  get: {
    tags: ['Auth'],
    summary: 'Trae el usuario a quien le pertenece el token ',
    parameters: [],
    responses: {
      '200': {
        description: 'OK',
        schema: {
          $ref: '#/definitions/Auth',
        },
      },
    },
    security: [
      {
        JWT: [],
      },
    ],
  },
};

export const findAuthUser = {
  post: {
    tags: ['Auth'],
    summary: 'Permite realizar el Login y te da el Token',
    parameters: [
      {
        name: 'Auth',
        in: 'body',
        description: '',
        schema: {
          properties: {
            user: { type: 'string' },
            password: { type: 'string' },
          },
        },
      },
    ],
    responses: {
      '200': {
        description: 'OK',
        schema: {
          properties: {
            token: { type: 'string' },
            ok: { type: 'boolean' },
            auth: { $ref: '#/definitions/Auth' },
          },
        },
      },
      '400': {
        schema: {
          properties: {
            message: { type: 'string' },
            ok: { type: 'boolean' },
          },
        },
      },
    },
    
  },
};
