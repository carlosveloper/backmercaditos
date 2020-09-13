import mongoose, { Schema, Document } from 'mongoose';
import * as ROLES from './roles';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUsuario extends Document {
  nombres: string;
  apellidos: string;
  fotoPerfil: string;
  rol: string;
  direccion: string;
  celular: string;
  lat: string;
  lng: string;
  correo: string;
  auth: Schema.Types.ObjectId;
}

const UsuarioSchema: Schema = new Schema({
  nombres: { type: String, required: 'los nombres son requeridos' },
  apellidos: { type: String, required: 'los apellidos son requeridos' },
  fotoPerfil: { type: String, default: '' },
  rol: {
    type: String,
    default: ROLES.rolesUsuarioValidos.values[1],
    enum: ROLES.rolesUsuarioValidos,
  },
  direccion: { type: String, required: 'la dirección es requerida' },
  celular: {
    type: String,
    required: 'el celular es requerido',
    minlength: 10,
    maxlength: 13,
  },
  lat: { type: String, default: '' },
  lng: { type: String, default: '' },
  correo: {
    type: String,
    required: 'el correo es requerido',
    unique: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'El email es incorrecto',
    ],
  },
  auth: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
    unique: true,
  },
});

UsuarioSchema.plugin(uniqueValidator, {
  message: 'Error, El {PATH} ya existe.',
});

const Usuario = mongoose.model<IUsuario>('Usuario', UsuarioSchema);

export default Usuario;
