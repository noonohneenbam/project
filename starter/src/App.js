import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

function BooksApp() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll()
      .then((fetchedBooks) => setBooks(fetchedBooks))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      setBooks((prevBooks) => {
        let updatedBooks = prevBooks.map((b) => {
          if (b.id === book.id) b.shelf = shelf;
          return b;
        });

        if (!prevBooks.find((b) => b.id === book.id) && shelf !== "none") {
          book.shelf = shelf;
          updatedBooks.push(book);
        }

        if (shelf === "none") {
          updatedBooks = updatedBooks.filter((b) => b.id !== book.id);
        }

        return updatedBooks;
      });
    });
  };

  const shelves = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Read" },
  ];

  return (
    <div className="app">
      <Routes>
        <Route
          path="/search"
          element={<SearchBooks books={books} onChangeShelf={changeShelf} />}
        />
        <Route
          path="/"
          element={<ListBooks books={books} shelves={shelves} onChangeShelf={changeShelf} />}
        />
      </Routes>
    </div>
  );
}

export default BooksApp;
