import React, { useState } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

function SearchBooks({ books, onChangeShelf }) {
  const [searchResults, setSearchResults] = useState([]);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (newValue.length > 0) {
      BooksAPI.search(newValue)
        .then((books) => {
          if (books.error) {
            setSearchResults([]);
          } else {
            setSearchResults(books);
          }
        })
        .catch(() => setSearchResults([]));
    } else {
      setSearchResults([]);
    }
  };

  const resetSearch = () => {
    setSearchResults([]);
  };

  const updateShelves = () => {
    return searchResults.map((searchedBook) => {
      const book = books.find((b) => b.id === searchedBook.id);
      return book ? { ...searchedBook, shelf: book.shelf } : { ...searchedBook, shelf: 'none' };
    });
  };

  const updatedSearchResults = updateShelves();

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search" onClick={resetSearch}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {updatedSearchResults.map((book) => (
            <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchBooks;
