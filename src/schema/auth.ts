import mongoose, { Schema, Document } from 'mongoose';
import * as ROLES from './roles';
import uniqueValidator from 'mongoose-unique-validator';





export interface IAuthentication extends Document {
  user: string;
  password: string;
  estado: string;
}

const AuthenticationSchema: Schema = new Schema({
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  estado: {
    type: String,
    default:ROLES.estadosUsuarioValidos.values[0],
    enum: ROLES.estadosUsuarioValidos,
  },
});



AuthenticationSchema.plugin(uniqueValidator, {
  message: 'Error, El {PATH} ya existe.',
});

const Authentication = mongoose.model<IAuthentication>(
  'Auth',
  AuthenticationSchema
);


export default Authentication;



