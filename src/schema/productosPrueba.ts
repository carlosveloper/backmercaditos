import mongoose, { Schema, Document } from 'mongoose';

export interface IProducto extends Document {
  nombre: string;
  precio: string;
  stock: string;
  imagen: string;
  descripcion: string;
}

const ProductoSchema: Schema = new Schema({
  nombre: { type: String, required: 'el  nombre es requerido' },
  precio: { type: String, required: 'el  precio es  requerido' },
  imagen: { type: String, required: 'la foto es requerida' },
  stock: { type: String, required: 'el stock es requerido' },
  descripcion: { type: String, required: 'el stock es requerido' },
});



const Productos = mongoose.model<IProducto>('Producto', ProductoSchema);

export default Productos;
