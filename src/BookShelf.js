import React, { Component } from 'react'
import BookEntry from './BookEntry'
import PropTypes from 'prop-types'

class BookShelf extends Component {
      state = {
            showSearchPage: false,
            books: [],
      }

      render() {
            const books = this.props.books
            return (
                  <div className="bookshelf">
                        <h2 className="bookshelf-title">{this.props.title}</h2>
                        <div className="bookshelf-books">
                              <ol className="books-grid">
                                    {books.map((book) => (
                                          <BookEntry  categoryName={this.props.categoryName} books={books} key={book.id} updateCategory={this.props.updateCategory} book={book} />
                                    ))}
                              </ol>
                        </div>
                  </div>
            )
      }  
}

BookShelf.propTypes = {
      books: PropTypes.array.isRequired
}

export default BookShelf;

