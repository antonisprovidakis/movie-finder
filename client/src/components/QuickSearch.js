import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import useDebounce from '../utilities/hooks/useDebounce';
import { Search, Input, Icon } from 'semantic-ui-react';
import { searchAPI } from '../api';
import { createImageSrc } from '../api/config/image';

function QuickSearch({ delay = 500, fullWidth = false, ...rest }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, delay);

    useEffect(() => {
        if (!searchTerm) {
            resetComponent();
        }
    }, [searchTerm]);

    useEffect(() => {
        const trimmedDebouncedSearchTerm = debouncedSearchTerm.trim();
        if (trimmedDebouncedSearchTerm) {
            fetchResults(trimmedDebouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    async function fetchResults(searchTerm) {
        setLoading(true);

        const res = await searchAPI.searchMulti(searchTerm, { language: 'en-US', region: 'US', page: 1 });
        const results = res.results;
        const resultsMoviesAndPersons = results.filter(result => result.media_type !== 'tv');
        const first5Results = resultsMoviesAndPersons.slice(0, 5);

        const first5ResultsWithAs = first5Results.map(
            result => {
                const data = {
                    key: result.id,
                    as: Link,
                };

                if (result.media_type === 'movie') {
                    data.title = result.title;
                    data.description = result.release_date.split('-')[0];
                    data.image = createImageSrc({ path: result.poster_path, type: 'poster', size: 'w92' });
                    data.to = `/movie/${result.id}`
                }
                else {
                    data.title = result.name;
                    data.image = createImageSrc({ path: result.profile_path, type: 'profile', size: 'w45' });
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
    }

    function handleResultSelect(e, data) {
        setSearchTerm('');
    }

    function handleSearchChange(e, { value }) {
        setSearchTerm(value);
    }

    return (
        <Search
            className="QuickSearch"
            input={
                <Input
                    fluid={fullWidth}
                    icon={searchTerm
                        ? <Icon name='delete' link onClick={resetComponent} title='Clear' />
                        : 'search'
                    }
                />
            }
            placeholder={'Quick search'}
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
