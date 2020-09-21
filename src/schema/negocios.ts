import mongoose, { Schema, Document } from 'mongoose';
import * as ROLES from './roles';
import uniqueValidator from 'mongoose-unique-validator';
export interface INegocio extends Document {
  nombre: string;
  descripcion: string;
  direccion: string;
  estado: string;
  lat: string;
  lng: string;
  celular: string;
  fotoPerfil: string;
  fotoPortada: string;
  valoracionN: number;
  valoracionP: number;
  atencion: Atencion;
  auth: Schema.Types.ObjectId;
  cateNego: Schema.Types.ObjectId;
}

export interface Atencion {
  lunes: Horas;
  martes: Horas;
  miercoles: Horas;
  jueves: Horas;
  viernes: Horas;
  sabado: Horas;
  domingo: Horas;
}

export interface Horas {
  apertura: string;
  cierre: string;
}

const HorasSchema = new Schema(
  {
    apertura: {
      type: String,
      required: true,
      match: [
        /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
        'La estructura de hora es incorrecta',
      ],
    },
    cierre: {
      type: String,
      required: true,
      match: [
        /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
        'La estructura de hora es incorrecta',
      ],
    },
  },
  {
    _id: false,
  }
);

const AtencionSchema = new Schema(
  {
    lunes: { type: HorasSchema, required: true },
    martes: { type: HorasSchema, required: true },
    miercoles: { type: HorasSchema, required: true },
    jueves: { type: HorasSchema, required: true },
    viernes: { type: HorasSchema, required: true },
    sabado: { type: HorasSchema, required: true },
    domingo: { type: HorasSchema, required: true },
  },
  {
    _id: false,
  }
);

const NegocioSchema: Schema = new Schema({
  nombre: { type: String, required: 'el nombre es requerido' },
  descripcion: { type: String, required: 'la descripción es requerida' },
  estado: {
    type: String,
    default: ROLES.estadosUsuarioValidos.values[0],
    enum: ROLES.estadosUsuarioValidos,
  },
  lat: { type: String, required: 'la latitud es requerida' },
  lng: { type: String, required: 'la latitud es requerida' },
  celular: {
    type: String,
    required: 'el celular es requerido',
    minlength: 10,
    maxlength: 13,
  },
  fotoPerfil: { type: String, required: false },
  fotoPortada: { type: String, required: false },
  valoracionN: { type: Number, default: 0.0 },
  valoracionP: { type: Number, default: 0.0 },
  atencion: {
    type: AtencionSchema,
    required: 'el horario de atención es requerido',
  },

  auth: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
  },
  cateNego: {
    type: Schema.Types.ObjectId,
    ref: 'CateNego',
    required: true,
  },
});

NegocioSchema.plugin(uniqueValidator, {
  message: 'Error, El {PATH} ya existe.',
});

const Negocio = mongoose.model<INegocio>('Negocio', NegocioSchema);

export default Negocio;
