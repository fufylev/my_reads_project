import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import '../App.css'
import Shelf from "./Shelf";

class MainPage extends Component {
    state = {
        books: [],
    };

    getAll = () => {
        BooksAPI.getAll()
            .then(books => this.setState(() => ({
                books: books
            })));
    };

    update = ({book, shelf}) => {
        // assumed that the response from the API server is always OK!
        BooksAPI.update(book, shelf)
            .then(() => this.getAll());
    };

    componentDidMount() {
        this.getAll();
    }

    render() {
        const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead');
        const read = this.state.books.filter(book => book.shelf === 'read');

        // form an array in oder to reduce an HTML code
        const arr = [
            {shelf: 'Currently Reading', books: currentlyReading},
            {shelf: 'Want to Read', books: wantToRead},
            {shelf: 'Read', books: read},
        ];

        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            {arr.map(el => (
                                <Shelf key={el.shelf}
                                       books={el.books}
                                       onChangeShelf={this.update}
                                       shelf={el.shelf}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="/search">
                            <button>Add a book</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage
