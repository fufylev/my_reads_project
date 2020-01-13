import React from 'react'
import { Route, Switch } from 'react-router-dom';
import './App.css'
import Search from "./Components/Search";
import MainPage from "./Components/MainPage";

const BooksApp = () => {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/"><MainPage/></Route>
                <Route path="/search"><Search/></Route>
            </Switch>
        </div>
    )
};

export default BooksApp
