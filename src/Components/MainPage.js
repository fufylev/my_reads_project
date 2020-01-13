import React, {Component} from 'react'
import * as BooksAPI from '../BooksAPI'
import '../App.css'
import CurrentlyReading from "../Components/CurrentlyReading";
import WantToRead from "../Components/WantToRead";
import Read from "../Components/Read";
import { Link } from 'react-router-dom';

class MainPage extends Component {
    state = {
        books: [],
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => this.setState(() => ({
                books: books
            })));
    }

    render() {
        const currentlyReading = this.state.books.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = this.state.books.filter(book => book.shelf === 'wantToRead');
        const read = this.state.books.filter(book => book.shelf === 'read');

        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <CurrentlyReading books={currentlyReading}/>
                            <WantToRead books={wantToRead}/>
                            <Read books={read}/>
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
