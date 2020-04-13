import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    categoryCurrentlyReading: [],
    categoryWantToRead: [],
    categoryRead: [],
    allBooks: [],

  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      console.log("getting all books"+books)

      this.setState(() => ({
        categoryCurrentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
        categoryWantToRead: books.filter((book) => book.shelf === 'wantToRead'),
        categoryRead: books.filter((book) => book.shelf === 'read'),
        allBooks: books
      }))

    })
  }

  updateCategory = (event, book, categoryName) => {

    const targetCategory = event.target.value;
    console.log("categoryName: " + categoryName)
    console.log("TargetCategory: " + targetCategory)

    if (categoryName !== targetCategory) {
      let updateCategoryName = ""

      if (targetCategory === 'categoryCurrentlyReading') {
        updateCategoryName = 'currentlyReading'
        this.setState((oldvalue) => {
          const categoryCurrentlyReading = oldvalue.categoryCurrentlyReading.concat(book)
          return { categoryCurrentlyReading }
        })
      }
      if (targetCategory === 'categoryWantToRead') {
        updateCategoryName = 'wantToRead'
        this.setState((oldvalue) => {
          const categoryWantToRead = oldvalue.categoryWantToRead.concat(book)
          return { categoryWantToRead }
        })
      }
      if (targetCategory === 'categoryRead') {
        updateCategoryName = 'read'
        this.setState((oldvalue) => {
          const categoryRead = oldvalue.categoryRead.concat(book)
          return { categoryRead }
        })
      }

      BooksAPI.update(book, updateCategoryName).then((json) => {
        console.log("Response")
        console.log(json)

      }).then(() => {
        this.removeBookFromCategory(book, categoryName);
      })
    }
  }

  removeBookFromCategory = (book, currentCategory) => {
    if (currentCategory === 'categoryCurrentlyReading') {
      this.setState({
        categoryCurrentlyReading: this.state.categoryCurrentlyReading.filter(function (currentbook) {
          return currentbook.id !== book.id
        })
      })
    }
    if (currentCategory === 'categoryWantToRead') {
      this.setState({
        categoryWantToRead: this.state.categoryWantToRead.filter(function (currentbook) {
          return currentbook.id !== book.id
        })
      })
    }
    if (currentCategory === 'categoryRead') {
      this.setState({
        categoryRead: this.state.categoryRead.filter(function (currentbook) {
          return currentbook.id !== book.id
        })
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            categoryCurrentlyReading={this.state.categoryCurrentlyReading}
            categoryWantToRead={this.state.categoryWantToRead}
            categoryRead={this.state.categoryRead}
            updateCategory={this.updateCategory} />
        )} />
        <Route exact path='/' render={() => (
          <ListBooks
            categoryCurrentlyReading={this.state.categoryCurrentlyReading}
            categoryWantToRead={this.state.categoryWantToRead}
            categoryRead={this.state.categoryRead}
            updateCategory={this.updateCategory}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
