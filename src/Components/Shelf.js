import React from 'react';
import PropTypes from 'prop-types';
import BookBlock from "./BookBlock";

const Shelf = props => {
    const {shelf, books, onChangeShelf} = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book =>
                        <BookBlock
                            key={book.id}
                            book={book}
                            onChangeShelf={onChangeShelf}
                        />)}
                </ol>
            </div>
        </div>
    );
};

Shelf.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
};

export default Shelf;