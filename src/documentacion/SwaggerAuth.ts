export const addAuthentication = {
  post: {
    tags: ['Auth'],
    summary: 'Crea la Autenticación',
    parameters: [
      {
        name: 'Auth',
        in: 'body',
        description: 'El estado del usuario por defecto es A',
        schema: {
          $ref: '#/definitions/Auth',
        },
      },
    ],
    responses: {
      '201': {
        description: 'OK',
        schema: {
          $ref: '#/definitions/Auth',
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
