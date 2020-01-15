import React, {PureComponent} from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import '../App.css'
import Shelf from "./Shelf";

// form a mapping array in oder to reduce an HTML code
const shelves = [
    {shelf: 'Currently Reading', filter: 'currentlyReading'},
    {shelf: 'Want to Read', filter: 'wantToRead'},
    {shelf: 'Read', filter: 'read'},
];

class MainPage extends PureComponent {
    state = {
        books: [],
    };

    getAll = () => {
        BooksAPI.getAll()
            .then(books => this.setState(() => ({
                books: books
            })))
            .catch(e => console.log(e))
    };

    update = ({book, shelf}) => {
        // assumed that the response from the API server is always OK!
        BooksAPI.update(book, shelf)
            .then((res) => {
                this.getAll()
            })
            .catch(e => console.log(e))
    };

    componentDidMount() {
        this.getAll();
    }

    render() {
        const {books} = this.state;

        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            {shelves.map(el => (
                                <Shelf key={el.shelf}
                                       books={books.filter(book => book.shelf === el.filter)}
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
