import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { discoverMovies, changeDiscoverOptions, resetDiscoverOptions } from '../redux/actions';
import { Form } from 'semantic-ui-react';
import '../styles/DiscoverPage.css';
import CollectionGrid from '../components/CollectionGrid';
import Pagination from '../components/Pagination';
import { genres } from '../api/config/genres';
import { sortingFilters } from '../api/config/sortingFilters';
import { getPageFromQueryString } from '../utils/page';
import { createQuery } from '../utils/discoverMovies';
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
    ({ value: genre.id, text: genre.name })
);

function DiscoverPage({
    page,
    options,
    totalPages,
    movies,
    isFetching,
    history,
    location,
    discoverMovies,
    changeDiscoverOptions,
    resetDiscoverOptions
}) {
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

    function handleChange(e, { name, value }) {
        changeDiscoverOptions({ [name]: value });
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
                            name='primaryReleaseYear'
                            label='Year'
                            fluid
                            selection
                            onChange={handleChange}
                            options={yearOptions}
                            value={primaryReleaseYear}
                        />
                        <Form.Dropdown
                            name='sortBy'
                            label='Sort By'
                            fluid
                            selection
                            onChange={handleChange}
                            options={sortByFilterOptions}
                            value={sortBy}
                        />
                        <Form.Dropdown
                            name='withGenres'
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
    const { options, byQuery = {} } = state.pagination.moviesByDiscoverOptions;
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

export default connect(mapStateToProps, {
    discoverMovies,
    changeDiscoverOptions,
    resetDiscoverOptions
})(DiscoverPage);
