import React from 'react';

/**
 * BookControl component that renders a dropdown menu for changing a book's shelf.
 */
class BookControl extends React.Component {
  state = {
    value: this.props.book.shelf,
  };

  /**
   * Handles changes to the dropdown menu.
   * @param {Object} event - The event object.
   */
  handleChange = (event) => {
    const newValue = event.target.value;
    this.setState({ value: newValue });
    this.props.onChangeShelf(this.props.book, newValue);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookControl;
