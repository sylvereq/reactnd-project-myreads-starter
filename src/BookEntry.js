import React  from 'react';

function BookEntry(props) {
      const book = props.book;
      const categoryName = props.categoryName;
      const style = {
            width: 128,
            height: 193,
            backgroundImage: `url(${(book.imageLinks && book.imageLinks.thumbnail) && book.imageLinks.thumbnail})`,
      }   

      return (
            <li>
                  <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={style}></div>
                        <div className="book-shelf-changer">
                              <select defaultValue={'move'} onChange={(event) => props.updateCategory(event, book, categoryName)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option className={categoryName === 'categoryCurrentlyReading' ? 'marked': null} value="categoryCurrentlyReading">
                                          Currently Reading
                                    </option>
                                    <option className={categoryName === 'categoryWantToRead' ? 'marked': null} value="categoryWantToRead">Want to Read</option>
                                    <option className={categoryName === 'categoryRead' ? 'marked': null} value="categoryRead" >Read</option>
                                    <option value="none">None</option>
                              </select>
                        </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors && book.authors.map((author) => (
                              <div key={author} className="book-authors">{author}</div>
                        ))}
                  </div>
            </li>
      )

}

export default BookEntry;
