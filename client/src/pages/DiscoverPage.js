import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { discoverMovies, changeDiscoverOptions, resetDiscoverOptions } from '../redux/actions';
import { Form } from 'semantic-ui-react';
import '../styles/DiscoverPage.css';
import MoviesGrid from '../components/MoviesGrid';
import Pagination from '../components/Pagination';
import MoviesGridPlaceholder from '../components/MoviesGridPlaceholder';
import { genres } from '../api/config/genres';
import extractPageFromReactRouterLocation from '../utils/extractPageFromReactRouterLocation';
import { createQuery } from '../utils/discoverMovies';

function createYearOptions({ fromYear = (new Date()).getFullYear(), toYear = 1900 } = {}) {
    if (fromYear === toYear) {
        const option = { value: fromYear, text: fromYear }
        return [option];
    }

    const step = fromYear < toYear ? 1 : -1;
    const padding = step; // use it to include toYear value

    let i = fromYear;
    const yearOptions = [];
    while (i !== (toYear + padding)) {
        const option = { value: i, text: i };
        yearOptions.push(option);
        i = i + step;
    }

    return yearOptions;
}

// TODO: set according to API (HINT: start from current year back to 1900)
const yearOptions = createYearOptions();

const sortByFilterOptions = [
    { value: 'popularity.desc', text: 'Popular Descending' },
    { value: 'popularity.asc', text: 'Popular Ascending' },
    { value: 'vote_average.desc', text: 'Rating Descending' },
    { value: 'vote_average.asc', text: 'Rating Ascending' },
    { value: 'release_date.desc', text: 'Release Date Descending' },
    { value: 'release_date.asc', text: 'Release Date Ascending' }
];

// check if they can be fetched from server dynamically
const genreOptions = genres.map(genre =>
    ({ value: genre.id, text: genre.name })
);

function DiscoverPage({ page, options, totalPages, movies, loading, history, location, discoverMovies, changeDiscoverOptions, resetDiscoverOptions }) {
    const { primaryReleaseYear, sortBy, withGenres } = options;

    useEffect(() => {
        return function () {
            resetDiscoverOptions();
        }
    }, []);

    useEffect(() => {
        discoverMovies({
            primaryReleaseYear,
            sortBy,
            withGenres,
            page
        });
    }, [primaryReleaseYear, sortBy, withGenres, page]);

    function handleYearChange(e, data) {
        changeDiscoverOptions({ primaryReleaseYear: data.value });
    }

    function handleSortByChange(e, data) {
        changeDiscoverOptions({ sortBy: data.value });
    }

    function handleGenresChange(e, data) {
        changeDiscoverOptions({ withGenres: data.value });
    }

    function gotoPage(newPage) {
        history.push({
            pathname: location.pathname,
            search: `?page=${newPage}`
        });
    }

    function handlePageChange(e, data) {
        gotoPage(data.activePage);
    }

    return (
        <div className="DiscoverPage">
            <h2 className="DiscoverPage__title">Discover</h2>
            <div className='DiscoverPage__menu'>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            label='Year'
                            fluid
                            selection
                            onChange={handleYearChange}
                            options={yearOptions}
                            value={primaryReleaseYear}
                        />
                        <Form.Dropdown
                            label='Sort By'
                            fluid
                            selection
                            onChange={handleSortByChange}
                            options={sortByFilterOptions}
                            value={sortBy}
                        />
                        <Form.Dropdown
                            label='Genres'
                            placeholder='Filter by genres...'
                            fluid
                            multiple
                            search
                            selection
                            onChange={handleGenresChange}
                            options={genreOptions}
                            value={withGenres}
                        />
                    </Form.Group>
                </Form>
            </div>

            <div className="DiscoverPage__movies-container">
                {loading
                    ?
                    <MoviesGridPlaceholder
                        num={12}
                        columns={4}
                        doubling
                    />
                    :
                    <MoviesGrid
                        columns={4}
                        doubling
                        movies={movies}
                        cardViewStyle='poster'
                    />
                }
            </div>

            <Pagination
                activePage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                topPadded
                disabled={loading}
            />
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const page = extractPageFromReactRouterLocation(ownProps.location);
    const cachedMovies = state.entities.movies;
    const moviesByDiscoverOptions = state.pagination.moviesByDiscoverOptions;
    const options = moviesByDiscoverOptions.currentOptions;
    const { primaryReleaseYear, sortBy, withGenres } = options;
    const query = createQuery(primaryReleaseYear, sortBy, withGenres);
    const movieIdsByQuery = moviesByDiscoverOptions.byQuery[query] || {};
    const pages = movieIdsByQuery.pages || {};
    const movieIds = pages[page] || [];
    const movies = movieIds.map(id => cachedMovies[id]);
    const loading = movieIdsByQuery.isFetching || false;
    const totalPages = movieIdsByQuery.totalPages || null;

    return {
        movies,
        page,
        totalPages,
        loading,
        options
    }
}

export default connect(mapStateToProps, { discoverMovies, changeDiscoverOptions, resetDiscoverOptions })(DiscoverPage);
