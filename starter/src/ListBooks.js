import React from 'react';
import Search from './Search';
import Bookshelf from './Bookshelf';
import { Link } from "react-router-dom";

/**
 * ListBooks component that renders a list of books on different shelves.
 */
class ListBooks extends React.Component {
  /**
   * Filters books for a particular shelf.
   * @param {Object} shelf - The shelf object with a key.
   * @returns {Array} The filtered books.
   */
  booksOnShelf = (shelf) => {
    return this.props.books.filter((book) => book.shelf === shelf.key);
  };

  render() {
    const { shelves, onChangeShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
          <Link to="/search">
            <h1 style={{ fontSize: "1.5rem", textDecoration: "none"}}>
              Click Here To Search For Books
            </h1>
          </Link>
        </div>
        <div className="list-books-content">
  {shelves.map((shelf) => {
    const booksOnThisShelf = this.booksOnShelf(shelf);
    return (
      <Bookshelf
        key={shelf.key}
        shelf={shelf}
        books={booksOnThisShelf}
        onChangeShelf={onChangeShelf}
      />
    );
  })}
  {this.props.books.length === 0 && <p>No books to display.</p>}
</div>
        <Search />
      </div>
    );
  }
}

export default ListBooks;
