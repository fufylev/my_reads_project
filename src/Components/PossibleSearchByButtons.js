import React from 'react';
import PropTypes from 'prop-types';
import { possibleSearchQuery } from './possibleSearchQuery'

const PossibleSearchByButtons = (props) => {
    const {onButtonPressed} = props;

    const onclickHandler = (event) => {
        onButtonPressed(event)
    };

    return (
        <div className="search-books-buttons">
            <h4>Possible ready queries:</h4>
            {possibleSearchQuery.map((query, index) => (
                <button
                    key={index}
                    value={query}
                    onClick={onclickHandler}
                    className="search-books-button"
                >{query}</button>
            ))}
        </div>
    );
};

PossibleSearchByButtons.propTypes = {
    onButtonPressed: PropTypes.func.isRequired,
};

export default PossibleSearchByButtons;