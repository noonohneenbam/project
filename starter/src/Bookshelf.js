import Book from './Book';
import React from 'react';


/**
 * Bookshelf component that renders a list of books on a shelf.
 */
class Bookshelf extends React.Component {
  render() {
    const { shelf, books, onChangeShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} onChangeShelf={onChangeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
