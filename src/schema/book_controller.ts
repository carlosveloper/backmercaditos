import { Request, Response } from 'express';
import Book from './book';

import * as Bcrypt from 'bcrypt';

export const allBooks = (req: Request, res: Response) => {
  const books = Book.find((err: any, books: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(books);
    }
  });
};

export const showBook = (req: Request, res: Response) => {
  const book = Book.findById(req.params.id, (err: any, book: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(book);
    }
  });
};

export const showBookAutor = (req: Request, res: Response) => {
  const book = Book.findOne(
    { author: req.body.author },
    (err: any, book: any) => {
      if (err) {
        res.send(err);
      } else {
        if (!book) {
          return res.status(400).send({ message: 'El autor no existe3' });
        }
        if (!Bcrypt.compareSync(req.body.title, book.title)) {
          return res
            .status(400)
            .send({ message: 'La  contraseña es invalida' });
        }
        res.send(book);
      }
    }
  );
};

export const addBook = (req: Request, res: Response) => {
  req.body.title = Bcrypt.hashSync(req.body.title, 10);
  const book = new Book(req.body);
  book.save((err: any) => {
    if (err) {
      console.log(err.code);
      res.status(401).send(err);
      //     res.status(400).send(err);
    } else {
     // book.title="";
      res.status(201).send(book);
    }
  });
};

export const updateBook = (req: Request, res: Response) => {
  let book = Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, book: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(book);
      }
    }
  );
};

export const deleteBook = (req: Request, res: Response) => {
  const book = Book.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Book deleted from database');
    }
  });
};
