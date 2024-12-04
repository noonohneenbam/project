import React, { useState } from 'react';

function BookControl({ book, onChangeShelf }) {
  const [value, setValue] = useState(book.shelf);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChangeShelf(book, newValue);
  };

  return (
    <div className="book-shelf-changer">
      <select value={value} onChange={handleChange}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

export default BookControl;
