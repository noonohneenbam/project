import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {
  state = {
    searchResults: [],
    value: '',
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ value });

    if (value.length > 0) {
      BooksAPI.search(value)
        .then((books) => {
          if (books.error) {
            this.setState({ searchResults: [] });
          } else {
            this.setState({ searchResults: books });
          }
        })
        .catch(() => this.setState({ searchResults: [] }));
    } else {
      this.setState({ searchResults: [] });
    }
  };

  resetSearch = () => {
    this.setState({ searchResults: [] });
  };

  updateShelves = (books) => {
    return this.state.searchResults.map((searchedBook) => {
      const book = books.find((b) => b.id === searchedBook.id);
      return book ? { ...searchedBook, shelf: book.shelf } : { ...searchedBook, shelf: 'none' };
    });
  };

  render() {
    const { books, onChangeShelf } = this.props;
    const updatedSearchResults = this.updateShelves(books);

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={this.resetSearch}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.value}
              onChange={this.handleChange}
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
}

export default SearchBooks;
