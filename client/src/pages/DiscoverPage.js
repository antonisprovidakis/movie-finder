import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { discoverMovies, changeQuery } from '../redux/actions';
import { Form } from 'semantic-ui-react';
import '../styles/DiscoverPage.css';
import MoviesGrid from '../components/MoviesGrid';
import Pagination from '../components/Pagination';
import MoviesGridPlaceholder from '../components/MoviesGridPlaceholder';
import extractPageFromReactRouterLocation from '../utilities/extractPageFromReactRouterLocation';

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
const genreOptions = [
    { value: 28, text: 'Action' },
    { value: 12, text: 'Adventure' },
    { value: 16, text: 'Animation' },
    { value: 35, text: 'Comedy' },
    { value: 80, text: 'Crime' },
    { value: 99, text: 'Documentary' },
    { value: 18, text: 'Drama' },
    { value: 10751, text: 'Family' },
    { value: 14, text: 'Fantasy' },
    { value: 36, text: 'History' },
    { value: 27, text: 'Horror' },
    { value: 10402, text: 'Music' },
    { value: 9648, text: 'Mystery' },
    { value: 10749, text: 'Romance' },
    { value: 878, text: 'Science Fiction' },
    { value: 10770, text: 'TV Movie' },
    { value: 53, text: 'Thriller' },
    { value: 10752, text: 'War' },
    { value: 37, text: 'Western' }
];

function DiscoverPage({ page, totalPages, movies, loading, history, location, discoverMovies, changeQuery }) {
    const [year, setYear] = useState(2018);
    const [sortByFilter, setSortByFilter] = useState(sortByFilterOptions[0].value);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        changeQuery(`${year}-${sortByFilter}-${genres.join('_')}`)

        discoverMovies({
            primary_release_year: year,
            sort_by: sortByFilter,
            with_genres: genres,
            page,
            region: 'US'
        });
    }, [year, sortByFilter, genres, page]);

    function handleYearChange(e, data) {
        setYear(data.value);
    }

    function handleSortByChange(e, data) {
        setSortByFilter(data.value);
    }

    function handleGenresChange(e, data) {
        setGenres(data.value);
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
                            value={year}
                        />
                        <Form.Dropdown
                            label='Sort By'
                            fluid
                            selection
                            onChange={handleSortByChange}
                            options={sortByFilterOptions}
                            value={sortByFilter}
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
                            value={genres}
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
    const currentQuery = moviesByDiscoverOptions.currentQuery;
    const movieIdsByQuery = moviesByDiscoverOptions.byQuery[currentQuery] || {};
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
    }
}

export default connect(mapStateToProps, { discoverMovies, changeQuery })(DiscoverPage);
