import mongoose, { Schema, Document } from 'mongoose';
import * as ROLES from './roles';
import uniqueValidator from 'mongoose-unique-validator';

export interface ICategoriaProducto extends Document {
  nombre: string;
  description: string;
  auth: Schema.Types.ObjectId;
}

const CategoriaProductoSchema: Schema = new Schema({
  nombre: { type: String, required: 'el nombre es requerido', unique: true },
  description: { type: String, required: 'la descripción es requerida' },
  estado: {
    type: String,
    default: ROLES.estadosUsuarioValidos.values[0],
    enum: ROLES.estadosUsuarioValidos,
  },
  auth: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
    unique: true,
  },
});

CategoriaProductoSchema.plugin(uniqueValidator, {
  message: 'Error, El {PATH} ya existe.',
});



const CategoriaProducto = mongoose.model<ICategoriaProducto>(
  'CategoriaProducto',
  CategoriaProductoSchema
);

export default CategoriaProducto;

