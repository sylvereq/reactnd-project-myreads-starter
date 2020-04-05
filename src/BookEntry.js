import React, { Component }  from 'react';

function BookEntry(props) {
      const book = props.book;
      const style = {
            width: 128,
            height: 193,
            backgroundImage: 'url('+book.imageLinks.thumbnail+')'
      }

      return (
            <li>
                  <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={style}></div>
                        <div className="book-shelf-changer">
                              <select>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                              </select>
                        </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors.map((author) => (
                              <div key={author} className="book-authors">{author}</div>
                        ))}
                  </div>
            </li>
      )

}

export default BookEntry;
