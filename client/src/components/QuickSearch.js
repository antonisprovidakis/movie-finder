import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import escapeRegExp from 'lodash/escapeRegExp';
import useDebounce from '../utilities/hooks/useDebounce';
import { Search, Input } from 'semantic-ui-react';
import * as moviesAPI from '../api/moviesAPI';

function QuickSearch(props) {
    const {
        delay = 1000,
        fluid = false,
        fluidInput = false,
        ...rest
    } = props;

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        if (searchTerm.length < 1) {
            resetComponent();
        }
    }, [searchTerm]);

    const debouncedSearchTerm = useDebounce(searchTerm, delay);
    useEffect(() => {
        if (debouncedSearchTerm.length > 0) {
            fetchResults(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    async function fetchResults(searchTerm) {
        // TODO: make API call to fetch movies
        setLoading(true);

        const movies = await moviesAPI.all();

        const re = new RegExp(escapeRegExp(searchTerm), 'i')

        const filteredResults = movies.filter(movie => re.test(movie.title));
        const filteredResultsWithAs = filteredResults.map(
            result => {
                return {
                    ...result,
                    // render as react router Link
                    as: Link,
                    to: `/movies/${result.id}`
                };
            }
        );

        setLoading(false);
        setResults(filteredResultsWithAs);
    }

    function resetComponent() {
        setLoading(false);
        setResults([]);
        setSearchTerm('');
    }

    function handleResultSelect(e, data) {
        setSearchTerm('');
    }

    function handleSearchChange(e, { value }) {
        setSearchTerm(value);
    }

    return (
        <Search
            className="QuickSeach"
            input={<Input fluid={fluidInput} />}
            placeholder={'Quick search'}
            size="small"
            fluid={fluid}
            onResultSelect={handleResultSelect}
            onSearchChange={handleSearchChange}
            loading={loading}
            results={results}
            value={searchTerm}
            {...rest}
        />
    );
}

export default QuickSearch;
