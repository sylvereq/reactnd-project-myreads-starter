import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class ListBooks extends Component {

      render() {
            return (
                  <div className="list-books">
                        <div className="list-books-title">
                              <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                              <BookShelf title='Currently reading' categoryName={"categoryCurrentlyReading"} books={this.props.categoryCurrentlyReading} updateCategory={this.props.updateCategory}></BookShelf>
                              <BookShelf title='Want to read' categoryName={"categoryWantToRead"} books={this.props.categoryWantToRead} updateCategory={this.props.updateCategory}></BookShelf>
                              <BookShelf title='Read' categoryName={"categoryRead"} books={this.props.categoryRead} updateCategory={this.props.updateCategory}></BookShelf>
                        </div>

                              
                        <div className="open-search">
                              <Link to="/search">
                                    <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                              </Link>
                        </div>
                  </div>
            )
      }  
}

ListBooks.propTypes = {
      categoryCurrentlyReading: PropTypes.array.isRequired,
      categoryWantToRead: PropTypes.array.isRequired,
      categoryRead:PropTypes.array.isRequired
}


export default ListBooks;