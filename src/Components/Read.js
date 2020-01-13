import React, { Component } from 'react';
import BookBlock from "./BookBlock";
import PropTypes from "prop-types";

class Read extends Component {
    render() {
        const {books} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book => <BookBlock key={book.id} book={book}/>)}
                    </ol>
                </div>
            </div>
        );
    }
}

Read.propTypes = {
    books: PropTypes.array.isRequired,
};

export default Read;