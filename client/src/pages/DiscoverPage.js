import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { discoverMovies } from '../redux/actions/movieActions';
import { Form } from 'semantic-ui-react';
import '../styles/DiscoverPage.css';
import CollectionGrid from '../components/CollectionGrid';
import Pagination from '../components/Pagination';
import { genres } from '../api/config/genres';
import { sortingFilters } from '../api/config/sortingFilters';
import { getPageFromQueryString } from '../utils/page';
import { updateQueryString } from '../utils/url';
import { createQuery, getDiscoverMoviesOptions } from '../utils/discoverMovies';
import PosterMovieCard from '../components/PosterMovieCard';
import PosterMovieCardPlaceholder from '../components/PosterMovieCardPlaceholder';

function createYearOptions({ fromYear = new Date().getFullYear(), toYear = 1900 } = {}) {
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

const yearOptions = createYearOptions({
    fromYear: new Date().getFullYear(),
    toYear: 1900
});

const sortByFilterOptions = sortingFilters.map(filter =>
    ({ value: filter.id, text: filter.text })
);

// check if they can be fetched from server dynamically
const genreOptions = genres.map(genre =>
    ({ value: String(genre.id), text: genre.name })
);

function DiscoverPage({
    page,
    options,
    totalPages,
    movies,
    isFetching,
    history,
    location,
    discoverMovies
}) {
    const { primaryReleaseYear, sortBy, withGenres } = options;

    useEffect(() => {
        discoverMovies({
            primaryReleaseYear,
            sortBy,
            withGenres,
            page
        });
    }, [discoverMovies, primaryReleaseYear, sortBy, withGenres, page]);

    function handleChange(e, { name, value }) {
        const newQueryString = updateQueryString(
            location.search,
            { [name]: value, page: 1 }
        );
        history.push(`?${newQueryString}`);
    }

    function handlePageChange(e, data) {
        const newQueryString = updateQueryString(
            location.search,
            { page: data.activePage }
        );
        history.push(`?${newQueryString}`);
    }

    function renderItem(item) {
        return <PosterMovieCard movie={item} />
    }

    function renderPlaceholderItem() {
        return <PosterMovieCardPlaceholder />;
    }

    const shouldRenderPagination = totalPages > 1 && page <= totalPages;

    return (
        <div className="DiscoverPage">
            <h2 className="DiscoverPage__title">Discover</h2>
            <div className='DiscoverPage__menu'>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Dropdown
                            name='primary_release_year'
                            label='Year'
                            fluid
                            selection
                            onChange={handleChange}
                            options={yearOptions}
                            value={primaryReleaseYear}
                        />
                        <Form.Dropdown
                            name='sort_by'
                            label='Sort By'
                            fluid
                            selection
                            onChange={handleChange}
                            options={sortByFilterOptions}
                            value={sortBy}
                        />
                        <Form.Dropdown
                            name='with_genres'
                            label='Genres'
                            placeholder='Filter by genres...'
                            fluid
                            multiple
                            search
                            selection
                            onChange={handleChange}
                            options={genreOptions}
                            value={withGenres}
                        />
                    </Form.Group>
                </Form>
            </div>

            <div className="DiscoverPage__movies-container">
                <CollectionGrid
                    collection={movies}
                    renderItem={renderItem}
                    placeholderItemsCount={20}
                    renderPlaceholderItem={renderPlaceholderItem}
                    loading={isFetching}
                    columns={4}
                    doubling
                />
            </div>

            {shouldRenderPagination &&
                <Pagination
                    activePage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    topPadded
                    disabled={isFetching}
                />
            }
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const cachedMovies = state.entities.movies;
    const { byQuery = {} } = state.pagination.moviesByDiscoverOptions;

    const options = getDiscoverMoviesOptions(ownProps.location.search);

    const query = createQuery(
        options.primaryReleaseYear,
        options.sortBy,
        options.withGenres
    );

    const {
        isFetching = false,
        totalPages = undefined,
        pages = {}
    } = byQuery[query] || {};

    const page = getPageFromQueryString(ownProps.location.search);
    const movieIds = pages[page] || [];
    const movies = movieIds.map(id => cachedMovies[id]);

    return {
        movies,
        page,
        totalPages,
        isFetching,
        options
    }
}

DiscoverPage.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    options: PropTypes.shape({
        primaryReleaseYear: PropTypes.number.isRequired,
        sortBy: PropTypes.string.isRequired,
        withGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    page: PropTypes.number,
    totalPages: PropTypes.number,
    isFetching: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
    }).isRequired,
    discoverMovies: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { discoverMovies })(DiscoverPage);
