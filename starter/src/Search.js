import { Link } from 'react-router-dom';
import React from 'react';

/**
 * Search component that renders a link to add a book.
 */
function Search() {
  return (
    <div className="open-search">
      <Link to="/search">
        <button type="button">Add a book</button>
      </Link>
    </div>
  );
}

export default Search;
