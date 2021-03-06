import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import CollectionGrid from '../components/CollectionGrid';
import Pagination from '../components/Pagination';
import MovieCard from '../components/MovieCard';
import MovieCardPlaceholder from '../components/MovieCardPlaceholder';
import { getPage, updateQueryString } from '../utils/queryString';
import { camelizeCategory, movieCategoriesRoutingMap } from '../api/config';
import { loadMoviesByCategory } from '../redux/actions/movieActions';
import { setMovieCardViewStyle } from '../redux/actions/uiActions';

function MoviesPage({
  category,
  page,
  movies,
  pagination,
  history,
  location,
  movieCardViewStyle,
  setMovieCardViewStyle,
  loadMoviesByCategory
}) {
  const [gridColumns, setGridColumns] = useState(
    movieCardViewStyle === 'poster' ? 4 : 2
  );

  useEffect(() => {
    loadMoviesByCategory(category, { page, region: 'US' });
  }, [loadMoviesByCategory, category, page]);

  useEffect(() => {
    const cols = movieCardViewStyle === 'poster' ? 4 : 2;
    setGridColumns(cols);
  }, [movieCardViewStyle]);

  function handlePageChange(e, data) {
    const newQueryString = updateQueryString(location.search, {
      page: data.activePage
    });
    history.push(`?${newQueryString}`);
  }

  function handleCardViewStyleOptionClick(e, item) {
    const newMovieCardViewStyle = item.value;
    setMovieCardViewStyle(newMovieCardViewStyle);
  }

  const moviesGridMenuItems = [
    <Dropdown text="View">
      <Dropdown.Menu>
        <Dropdown.Item
          text="Poster Card View"
          value="poster"
          onClick={handleCardViewStyleOptionClick}
        />
        <Dropdown.Item
          text="Backdrop Card View"
          value="backdrop"
          onClick={handleCardViewStyleOptionClick}
        />
      </Dropdown.Menu>
    </Dropdown>
  ];

  function renderItem(movie) {
    return (
      <MovieCard
        movie={movie}
        type={movieCardViewStyle}
        showOverview={movieCardViewStyle === 'backdrop'}
        as={Link}
        to={`/movie/${movie.id}`}
        data-testid={`${movieCardViewStyle}-movie-card`}
      />
    );
  }

  function renderPlaceholderItem() {
    // TODO: or BackdropMovieCardPlaceholder (not implemented, yet)
    return <MovieCardPlaceholder />;
  }

  const { totalPages, selectedPageData } = pagination;
  const { isFetching } = selectedPageData;

  const shouldRenderPagination = totalPages > 1 && page <= totalPages;

  return (
    <div className="MoviesPage" data-testid="movies-page">
      <div className="MoviesPage__movies-container">
        <CollectionGrid
          title={`${movieCategoriesRoutingMap[category].text} Movies`}
          collection={movies}
          renderItem={renderItem}
          menuItems={moviesGridMenuItems}
          placeholderItemsCount={20}
          renderPlaceholderItem={renderPlaceholderItem}
          loading={isFetching}
          columns={gridColumns}
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
  const category = camelizeCategory(ownProps.match.params.category);
  const page = getPage(ownProps.location.search);
  const cachedMovies = state.entities.movies;
  const pagination = state.pagination.moviesByCategory[category];
  const selectedPageData = pagination.pages[page] || { ids: [] };
  const movies = selectedPageData.ids.map(id => cachedMovies[id]);
  const movieCardViewStyle = state.ui.movieCardViewStyle;

  return {
    category,
    page,
    movies,
    pagination: {
      totalPages: pagination.totalPages,
      selectedPageData
    },
    movieCardViewStyle
  };
};

MoviesPage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  category: PropTypes.string.isRequired,
  page: PropTypes.number,
  pagination: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  movieCardViewStyle: PropTypes.oneOf(['poster', 'backdrop']),
  setMovieCardViewStyle: PropTypes.func.isRequired,
  loadMoviesByCategory: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { loadMoviesByCategory, setMovieCardViewStyle }
)(MoviesPage);
