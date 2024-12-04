import React, { useState } from 'react';

const shelves = [
  { id: "currentlyReading", name: "Currently Reading" },
  { id: "wantToRead", name: "Want to Read" },
  { id: "read", name: "Read" },
  { id: "none", name: "None" }
];

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
        {shelves.map((shelf) => (
          <option key={shelf.id} value={shelf.id}>
            {shelf.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BookControl;
