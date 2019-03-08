import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import useDebounce from '../utilities/hooks/useDebounce';
import { Search, Input } from 'semantic-ui-react';
import { searchAPI } from '../api';
import { buildImageUrl, defaultImageBase64Data } from '../api/config/image';

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
        setLoading(true);

        const res = await searchAPI.searchMulti(searchTerm);
        const results = res.data.results;
        const resultsMoviesAndPeople = results.filter(result => result.media_type !== 'tv');
        const first5Results = resultsMoviesAndPeople.slice(0, 5);

        const first5ResultsWithAs = first5Results.map(
            result => {
                const data = {
                    key: result.id,
                    as: Link,
                };

                if (result.media_type === 'movie') {
                    data.title = result.title;
                    data.description = result.release_date.split('-')[0];
                    data.image = (result.poster_path && buildImageUrl({ path: result.poster_path, type: 'poster', size: 'w92' })) || defaultImageBase64Data;
                    data.to = `/movie/${result.id}`
                }
                else {
                    data.title = result.name;
                    data.image = (result.profile_path && buildImageUrl({ path: result.profile_path, type: 'profile', size: 'w45' })) || defaultImageBase64Data;
                    data.to = `/person/${result.id}`
                }

                return data;
            }
        );

        setLoading(false);
        setResults(first5ResultsWithAs);
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
