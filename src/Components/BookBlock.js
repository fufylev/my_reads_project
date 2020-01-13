import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookBlock extends Component {
    state = {
        value: this.props.book.shelf
    };

    handleChange = (event) => {
        const {book, onChangeShelf} = this.props;
        const {value} = event.target;
        if (value !== book.shelf) {
            onChangeShelf({book, shelf: value});
            this.setState(() => ({value}));
        }
    };

    render() {
        const {book} = this.props;
        const imgUrl = book.imageLinks.smallThumbnail;

        const style = {
            width: 128,
            height: 193,
            backgroundImage: `url(${imgUrl})`
        };

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={style}></div>
                        <div className="book-shelf-changer">
                            <select value={this.state.value} onChange={this.handleChange}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                {/*<option value="none">None</option>*/}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors.map((author, index) =>
                        <div className="book-authors" key={index}> {author} </div>
                    )}
                </div>
            </li>
        );
    }
}

BookBlock.ropTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
};

export default BookBlock;