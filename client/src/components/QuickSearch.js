import React, { useState, useEffect } from 'react';
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

    const movies = moviesAPI.all();

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
            setLoading(true);
            // TODO: make API call to fetch movies

            const re = new RegExp(escapeRegExp(searchTerm), 'i')
            const isMatch = result => re.test(result.title)

            setLoading(false);
            setResults(movies.filter(isMatch));
        }
    }, [debouncedSearchTerm]);

    function resetComponent() {
        setLoading(false);
        setResults([]);
        setSearchTerm('');
    }

    function handleResultSelect(e, { result }) {
        setSearchTerm(result.title);
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
