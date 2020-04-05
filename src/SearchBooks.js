import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookEntry from './BookEntry'

class SearchBooks extends Component {
      state = {
            books: [],
            bookSearchString: ""
      }

      searchBooks = (searchString) => {
            BooksAPI.search(searchString).then((books) => {
                  console.log(books)
                  this.setState(() => ( {
                        books
                  }))
            })

      }

      componentDidMount () {
            //this.getAllBooks();
      }

      onSearchChanged = (value) => {
            this.setState(() => ({
                  bookSearchString: value
            }))
      }
  
      render() {
            const { books, bookSearchString } = this.state;

            const showingBooks = bookSearchString === ''
            ? books
            : books.filter((c) => c.title.toLowerCase().includes(bookSearchString.toLowerCase() ||  c.authors.filter((author) => {
                        author.toLowerCase().includes(bookSearchString.toLowerCase())
                  }).length > 0 )
            )

            return (
                  <div className="search-books">
                        <div className="search-books-bar">
                              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                              <div className="search-books-input-wrapper">
                              {/*
                                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                    You can find these search terms here:
                                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                    you don't find a specific author or title. Every search is limited by search terms.
                              */}
                              <input type="text" onChange={(event) => this.onSearchChanged(event.target.value)} value={bookSearchString} placeholder="Search by title or author"/>

                              </div>
                        </div>
                        <div className="search-books-results">
                              <ol className="books-grid">
                                    {showingBooks.map((book) => (
                                          <BookEntry  key={book.id} book={book} />
                                    ))}
                              </ol>
                        </div>
                  </div>
            )
      }  
}

export default SearchBooks;