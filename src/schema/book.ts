import mongoose, { Schema, Document } from 'mongoose';

import uniqueValidator from 'mongoose-unique-validator';


export interface BookInterface extends Document {
  title: string;
  author: string;
  email:string;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: {
    type: String,
    unique: true,
    index: true,
    required: 'El autor es requerido',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    index: true,
    required: 'El email es requerido',
    //validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'El email es incorrecto',
    ],

  },
});

//BookSchema.plugin(uniqueValidator);

/* BookSchema.methods.toJson=function(){
  let book=this;
  let bookObject=book.toObject();
  delete bookObject.title;
  return bookObject;
}
 */

BookSchema.plugin(uniqueValidator, {
  message: 'Error, El {PATH} ya existe.',

});

const Book = mongoose.model<BookInterface>('Book', BookSchema);
export default Book;
