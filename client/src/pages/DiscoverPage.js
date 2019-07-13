import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import CollectionGrid from '../components/CollectionGrid';
import Pagination from '../components/Pagination';
import PosterMovieCard from '../components/PosterMovieCard';
import PosterMovieCardPlaceholder from '../components/PosterMovieCardPlaceholder';
import { genres, SortingFilterType } from '../api/config';
import {
  getFilters,
  getPage,
  stringifyFilters,
  updateQueryString
} from '../utils/queryString';
import { discoverMovies } from '../redux/actions/movieActions';

function createYearOptions(fromYear, toYear) {
  if (fromYear === toYear) {
    const option = { value: fromYear, text: fromYear };
    return [option];
  }

  const step = fromYear < toYear ? 1 : -1;
  const padding = step; // use it to include toYear value

  let i = fromYear;
  const yearOptions = [];
  while (i !== toYear + padding) {
    const option = { value: i, text: i };
    yearOptions.push(option);
    i = i + step;
  }

  return yearOptions;
}

const yearOptions = createYearOptions(new Date().getFullYear(), 1900);

const sortByFilterOptions = [
  {
    value: SortingFilterType.POPULARITY_DESC,
    text: 'Popularity Descending'
  },
  {
    value: SortingFilterType.POPULARITY_ASC,
    text: 'Popularity Ascending'
  },
  {
    value: SortingFilterType.VOTE_AVERAGE_DESC,
    text: 'Rating Descending'
  },
  {
    value: SortingFilterType.VOTE_AVERAGE_ASC,
    text: 'Rating Ascending'
  },
  {
    value: SortingFilterType.RELEASE_DATE_DESC,
    text: 'Release Date Descending'
  },
  {
    value: SortingFilterType.RELEASE_DATE_ASC,
    text: 'Release Date Ascending'
  }
];

// check if they can be fetched from server dynamically
const genreOptions = genres.map(genre => ({
  value: String(genre.id),
  text: genre.name
}));

function DiscoverPage({
  page,
  filters,
  movies,
  pagination,
  history,
  location,
  discoverMovies
}) {
  const { primaryReleaseYear, sortBy, withGenres } = filters;

  useEffect(() => {
    discoverMovies({
      primaryReleaseYear,
      sortBy,
      withGenres,
      page
    });
  }, [discoverMovies, primaryReleaseYear, sortBy, withGenres, page]);

  function handleChange(e, { name, value }) {
    const newQueryString = updateQueryString(location.search, {
      [name]: value,
      page: 1
    });
    history.push(`?${newQueryString}`);
  }

  function handlePageChange(e, data) {
    const newQueryString = updateQueryString(location.search, {
      page: data.activePage
    });
    history.push(`?${newQueryString}`);
  }

  function renderItem(movie) {
    return (
      <PosterMovieCard
        movie={movie}
        as={Link}
        to={`/movie/${movie.id}`}
        data-testid="movie-card"
      />
    );
  }

  function renderPlaceholderItem() {
    return <PosterMovieCardPlaceholder />;
  }

  const { totalPages, selectedPageData } = pagination;
  const { isFetching } = selectedPageData;

  const shouldRenderPagination = totalPages > 1 && page <= totalPages;

  return (
    <div className="DiscoverPage" data-testid="discover-page">
      <h2 className="DiscoverPage__title">Discover New Movies</h2>
      <div className="DiscoverPage__menu">
        <Form data-testid="discovery-form">
          <Form.Group widths="equal">
            <Form.Dropdown
              id="dropdown_primary_release_year"
              name="primary_release_year"
              label="Year"
              fluid
              selection
              onChange={handleChange}
              options={yearOptions}
              value={primaryReleaseYear}
            />
            <Form.Dropdown
              id="dropdown_sort_by"
              name="sort_by"
              label="Sort By"
              fluid
              selection
              onChange={handleChange}
              options={sortByFilterOptions}
              value={sortBy}
            />
            <Form.Dropdown
              id="dropdown_with_genres"
              name="with_genres"
              label="Genres"
              placeholder="Filter by genres..."
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

      {shouldRenderPagination && (
        <Pagination
          activePage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          topPadded
          disabled={isFetching}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const filters = getFilters(ownProps.location.search);
  const query = stringifyFilters(filters);
  const page = getPage(ownProps.location.search);
  const cachedMovies = state.entities.movies;
  const pagination = state.pagination.moviesByDiscoverOptions[query] || {
    pages: {}
  };
  const selectedPageData = pagination.pages[page] || { ids: [] };
  const movies = selectedPageData.ids.map(id => cachedMovies[id]);

  return {
    movies,
    page,
    pagination: {
      totalPages: pagination.totalPages,
      selectedPageData
    },
    filters
  };
};

DiscoverPage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  filters: PropTypes.shape({
    primaryReleaseYear: PropTypes.number.isRequired,
    sortBy: PropTypes.string.isRequired,
    withGenres: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  page: PropTypes.number,
  pagination: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  discoverMovies: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { discoverMovies }
)(DiscoverPage);
