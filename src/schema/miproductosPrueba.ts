import mongoose, { Schema, Document } from 'mongoose';

export interface IProducto extends Document {
  nombre: string;
  total: string;
  imagen: string;
  latitud: string;
  longitud: string;
  cantidad:string;
  precio:string;
  descripcion: string;
  auth: Schema.Types.ObjectId;
}

const ProductoSchema: Schema = new Schema({
  nombre: { type: String, required: 'el  nombre es requerido' },
  total: { type: String, required: 'el  total es  requerido' },
  imagen: { type: String, required: 'la foto es requerida' },
  latitud: { type: String, required: 'la latitud es requerida' },
  cantidad: { type: String, required: 'la cantidad es requerida' },
  precio: { type: String, required: 'la precio es requerida' },

  longitud: { type: String, required: 'la longitud es requerida' },
  descripcion: { type: String, required: 'el stock es requerido' },
  auth: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
  },
});



const Productos = mongoose.model<IProducto>('MisProductos', ProductoSchema);
export default Productos;
