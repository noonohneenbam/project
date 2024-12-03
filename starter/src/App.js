import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

class BooksApp extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => this.setState({ books }))
      .catch((error) => console.error("Error fetching books:", error));
  }

  shelves = [
    { key: "currentlyReading", name: "Books I'm Currently Reading" },
    { key: "wantToRead", name: "My Wish List" },
    { key: "read", name: "Already Read" },
  ];

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState((state) => {
        let updatedBooks = state.books.map((b) => {
          if (b.id === book.id) b.shelf = shelf;
          return b;
        });

        if (!state.books.find((b) => b.id === book.id) && shelf !== "none") {
          book.shelf = shelf;
          updatedBooks.push(book);
        }

        if (shelf === "none") {
          updatedBooks = updatedBooks.filter((b) => b.id !== book.id);
        }

        return { books: updatedBooks };
      });
    });
  };

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Routes>
          <Route
            path="/search"
            element={
              <SearchBooks books={books} onChangeShelf={this.changeShelf} />
            }
          />
          <Route
            path="/"
            element={
              <ListBooks
                books={books}
                shelves={this.shelves}
                onChangeShelf={this.changeShelf}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
