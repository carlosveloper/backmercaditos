import mongoose, { Schema, Document } from 'mongoose';

export interface IProducto extends Document {
  nombre: string;
  precio: number;
  stock: number;
  imagenes: Imagenes;
  valoracion: number;
  descripcion: string;
  negocio: Schema.Types.ObjectId;
  cateProd: Schema.Types.ObjectId;
}



export interface Imagenes {
  uno: string;
  dos: string;
  tres: string;
  cuatro: string;
  cinco: string;
  seis: string;
  siete: string;
  ocho: string;
  nueve: string;
  diez: string;
}



const ImagenesSchema = new Schema(
  {
    uno: { type: String, required: false },
    dos: { type: String, required: false },
    tres: { type: String, required: false },
    cuatro: { type: String, required: false },
    cinco: { type: String, required: false },
    seis: { type: String, required: false },
    siete: { type: String, required: false },
    ocho: { type: String, required: false },
    nueve: { type: String, required: false },
    diez: { type: String, required: false },
  },
  {
    _id: false,
  }
);


const ProductoSchema: Schema = new Schema({
  nombre: { type: String, required: 'el  nombre es requerido' },
  precio: { type: Number, required: 'el  precio es  requerido' },
  imagenes: { type: ImagenesSchema, required: false },
  stock: { type: Number, required: 'el stock es requerido' },
  valoracion: { type: Number, default: 0.0 },
  descripcion: { type: String, required: 'la descripción es requerida' },
  negocio: {
    type: Schema.Types.ObjectId,
    ref: 'Negocio',
    required: true,
  },

  cateProd: {
    type: Schema.Types.ObjectId,
    ref: 'CateProduc',
    required: true,
  },
});


const Productos = mongoose.model<IProducto>('Productos', ProductoSchema);
export default Productos;
