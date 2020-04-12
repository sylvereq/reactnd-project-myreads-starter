import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookEntry from './BookEntry'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
      state = {
            books: [],
            bookSearchString: ""
      }

      componentDidMount () {
            //this.getAllBooks();
      }

      onSearchChanged = (value) => {

            this.setState(() => ( {
                  bookSearchString: value 
            }))

            if (value === '') {
                  this.setState(() => ( {
                        books: []
                  }))
            } else {
                  BooksAPI.search(value).then((books) => {
                        
                        


                        if (books === undefined || books.error || value === '') {
                        } else {
                              books.forEach((book) => {
                                    this.props.categoryCurrentlyReading.forEach((currentlyReading) => {
                                          if(book.id === currentlyReading.id) {
                                                book.categoryName = "categoryCurrentlyReading"
                                          }
                                    })
      
                                    this.props.categoryWantToRead.forEach((wantToRead) => {
                                          if(book.id === wantToRead.id) {
                                                book.categoryName = "categoryWantToRead"
                                          }
                                    })
      
                                    this.props.categoryRead.forEach((read) => {
                                          if(book.id === read.id) {
                                                book.categoryName = "categoryRead"
                                          }
                                    })
                              })
                              console.log(books)

                              if(this.state.bookSearchString !== '')
                                    this.setState(() => ( {
                                          books
                                    }))
                        }
                  })
            }
      }
  
      render() {
            const { books, bookSearchString } = this.state;

            return (
                  <div className="search-books">
                        <div className="search-books-bar">
                              <Link to='/' className="close-search" >Close</Link>
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
                                    {books.map((book) => (
                                          <BookEntry categoryName={book.categoryName} updateCategory={this.props.updateCategory} key={book.id} book={book} />
                                    ))}
                              </ol>
                        </div>
                  </div>
            )
      }  
}

export default SearchBooks;