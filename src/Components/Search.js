import React, { PureComponent } from 'react';
import * as BooksAPI from "../BooksAPI";
import { Link } from 'react-router-dom';
import BookBlock from "./BookBlock";
import PossibleSearchByButtons from "./PossibleSearchByButtons";


class Search extends PureComponent {
    state = {
        searchedBooks: [],
        booksOnMyShelf: [],
        query: '',
        ifSearchSuccess: true
    };

    clearState = () => {
        this.setState(() => ({
            searchedBooks: [],
            booksOnMyShelf: [],
            query: '',
            ifSearchSuccess: true
        }))
    };

    eventHandler = (event) => {
        const query = event.target.value;
        // check whether the QUERY empty or not
        if (query.trim().length !== 0) {
            // if not then proceed with a search
            this.setState((prevState) => ({
                ...prevState, searchedBooks: [], query, ifSearchSuccess: true
            }), () => this.search(query));
        } else {
            // if empty then clear the state
            this.clearState();
        }
    };

    search = (query) => {
        // very often your server response with an ERROR. Therefore... I had to apply some extra code
        BooksAPI.search(query)
            .then(books => {
                if (books.error) {
                    // show to User the message that 'No matches regards your query'
                    this.setState((prevState) => ({
                        ...prevState, searchedBooks: [], query, ifSearchSuccess: false
                    }))
                } else {
                    this.shelfAssign(books);
                }
            })
            .catch(e => console.log(e))
    };

    /**
     * this function allows us to check if any searched/found books exist on My shelf
     * If the book is on My shelf, then we assign it the particular shelf.
     * If not, then assign it the value "none"
     * This function alters only `this.state`.
     * @param {Array} books - searched books array received from API
     */
    shelfAssign = (books) => {
        const alteredBooksArray = new Promise((resolve, reject) => {
            const {booksOnMyShelf} = this.state;
            resolve(books.map((book) => {
                let alteredBook = {...book, shelf: 'none'};
                booksOnMyShelf.forEach(bookOnShelf => {
                    if (book.id === bookOnShelf.id) {
                        alteredBook = {...alteredBook, shelf: bookOnShelf.shelf}
                    }
                });
                return alteredBook
            }));
        });

        // once cycle has finished we update the state
        alteredBooksArray.then(books => this.setState({searchedBooks: books}))
    };

    /* here I use this provided API to add the book from the 'search list' to the particular shelf on the main page */
    update = ({book, shelf}) => {
        // assumed that the response from the API server is always OK!
        BooksAPI.update(book, shelf)
            .then(res => this.getAll())
            .catch(e => console.log(e))
    };

    getAll = () => {
        BooksAPI.getAll()
            .then(books => this.setState(() => ({
                booksOnMyShelf: books
            })))
            .catch(e => console.log(e))
    };

    componentDidMount() {
        this.getAll();
    }

    render() {
        const {searchedBooks, ifSearchSuccess} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={this.state.query}
                            onChange={this.eventHandler}
                            placeholder="Search by title or author"/>
                    </div>
                </div>
                <PossibleSearchByButtons onButtonPressed={this.eventHandler}/>
                <div className="search-books-results">
                    {!ifSearchSuccess && <h4>No matches regards your query</h4>}
                    <ol className="books-grid">
                        {searchedBooks && searchedBooks.map(book =>
                            <BookBlock
                                key={book.id}
                                book={book}
                                onChangeShelf={this.update}
                            />)}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;