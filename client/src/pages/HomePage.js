import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/HomePage.css';
import _get from 'lodash/get';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';
import CollectionGrid from '../components/CollectionGrid';
import MovieCard from '../components/MovieCard';
import MovieCardPlaceholder from '../components/MovieCardPlaceholder';
import { loadMoviesByCategory } from '../redux/actions/movieActions';
import { MovieCategory, movieCategoriesRoutingMap } from '../api/config';

function MovieSections({ sectionsData }) {
  return (
    <div className="HomePage__movies-container">
      {sectionsData.map((sectionData, index) => (
        <MovieSection key={index} sectionData={sectionData} />
      ))}
    </div>
  );
}

function MovieSection({ sectionData }) {
  const {
    category,
    title,
    movies,
    linkTo,
    renderItem,
    renderPlaceholderItem
  } = sectionData;

  return (
    <div
      key={title}
      className="HomePage__movies-container__section"
      data-testid={`movie-section-${category}`}
    >
      <div className="HomePage__movies-container__section__main">
        <CollectionGrid
          title={title}
          collection={movies}
          renderItem={renderItem}
          placeholderItemsCount={4}
          renderPlaceholderItem={renderPlaceholderItem}
          loading={movies.length === 0}
          columns={4}
          doubling
        />
      </div>
      {movies.length !== 0 && (
        <div className="HomePage__movies-container__section__bottom">
          <Button
            as={Link}
            to={linkTo}
            color="orange"
            floated="right"
            data-testid={`btn-more-${category}`}
          >
            See More
          </Button>
        </div>
      )}
    </div>
  );
}

const categories = [
  MovieCategory.POPULAR,
  MovieCategory.NOW_PLAYING,
  MovieCategory.UPCOMING
];

function renderItem(movie) {
  return (
    <MovieCard
      movie={movie}
      type="poster"
      as={Link}
      to={`/movie/${movie.id}`}
      data-testid="movie-card"
    />
  );
}

function renderPlaceholderItem() {
  return <MovieCardPlaceholder />;
}

function HomePage({
  popularMovies,
  nowPlayingMovies,
  upcomingMovies,
  loadMoviesByCategory
}) {
  useEffect(() => {
    categories.forEach(category =>
      loadMoviesByCategory(category, { page: 1, region: 'US' })
    );
  }, [loadMoviesByCategory]);

  const moviesMapping = {
    [MovieCategory.POPULAR]: popularMovies,
    [MovieCategory.NOW_PLAYING]: nowPlayingMovies,
    [MovieCategory.UPCOMING]: upcomingMovies
  };

  const sectionsData = categories.map(category => ({
    category,
    title: `${movieCategoriesRoutingMap[category].text} Movies`,
    movies: moviesMapping[category],
    linkTo: `/movie/${movieCategoriesRoutingMap[category].slug}`,
    renderItem,
    renderPlaceholderItem
  }));

  return (
    <div className="HomePage" data-testid="home-page">
      <Header
        className="HomePage__welcome-message"
        size="huge"
        textAlign="center"
        dividing
      >
        Welcome to Movie Finder
        <Header.Subheader>
          Find information about any movie or actor/actress.
        </Header.Subheader>
      </Header>

      <MovieSections sectionsData={sectionsData} />
    </div>
  );
}

const mapStateToProps = state => {
  const cachedMovies = state.entities.movies;
  const { popular, nowPlaying, upcoming } = state.pagination.moviesByCategory;

  const path = 'pages[1].ids';
  const popularMovieIds = _get(popular, path, []).slice(0, 4);
  const nowPlayingMovieIds = _get(nowPlaying, path, []).slice(0, 4);
  const upcomingMovieIds = _get(upcoming, path, []).slice(0, 4);

  const popularMovies = popularMovieIds.map(id => cachedMovies[id]);
  const nowPlayingMovies = nowPlayingMovieIds.map(id => cachedMovies[id]);
  const upcomingMovies = upcomingMovieIds.map(id => cachedMovies[id]);

  return {
    popularMovies,
    nowPlayingMovies,
    upcomingMovies
  };
};

HomePage.propTypes = {
  popularMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  nowPlayingMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  upcomingMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadMoviesByCategory: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { loadMoviesByCategory }
)(HomePage);
