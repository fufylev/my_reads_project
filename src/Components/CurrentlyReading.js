import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookBlock from "./BookBlock";

class CurrentlyReading extends Component {
    render() {
        const {books} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => <BookBlock key={book.id} book={book}/>)}
                    </ol>
                </div>
            </div>
        );
    }
}
CurrentlyReading.propTypes = {
    books: PropTypes.array.isRequired,
};

export default CurrentlyReading;