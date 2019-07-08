import React from 'react';
import { fireEvent, waitForDomChange } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { renderWithReduxAndRouter } from '../../test/render';
import { movieAPI } from '../../api';
import { movieCategoriesRoutingMap } from '../../api/config';
import '../../test/matchMedia.mock';
import MoviesPage from '../MoviesPage';

jest.mock('../../api');

const moviesPageValidPaths = [
  movieCategoriesRoutingMap.popular.slug,
  movieCategoriesRoutingMap.upcoming.slug,
  movieCategoriesRoutingMap.nowPlaying.slug,
  movieCategoriesRoutingMap.topRated.slug
].join('|');

it('should make api call for popular movies', () => {
  renderWithReduxAndRouter(
    <Route
      exact
      sensitive
      path={`/movie/:category(${moviesPageValidPaths})`}
      component={MoviesPage}
    />,
    {},
    { route: '/movie/popular' }
  );

  expect(movieAPI.getMoviesByCategory).toHaveBeenCalledTimes(1);
  expect(movieAPI.getMoviesByCategory).toHaveBeenCalledWith('popular', {
    page: 1,
    region: 'US'
  });
});

it('should render collection title', async () => {
  const { getByText } = renderWithReduxAndRouter(
    <Route
      exact
      sensitive
      path={`/movie/:category(${moviesPageValidPaths})`}
      component={MoviesPage}
    />,
    {},
    { route: '/movie/popular' }
  );

  await waitForDomChange();
  expect(getByText(/popular movies/i)).toBeInTheDocument();
});

it('should render pagination after data is fetched', async () => {
  const { queryByTestId } = renderWithReduxAndRouter(
    <Route
      exact
      sensitive
      path={`/movie/:category(${moviesPageValidPaths})`}
      component={MoviesPage}
    />,
    {},
    { route: '/movie/popular' }
  );

  expect(queryByTestId('pagination')).not.toBeInTheDocument();
  await waitForDomChange();
  expect(queryByTestId('pagination')).toBeInTheDocument();
  expect(queryByTestId('pagination-active-page')).toHaveTextContent('1');
});

it("should navigate to movie's page if card is clicked", async () => {
  const { getAllByTestId, history } = renderWithReduxAndRouter(
    <Route
      exact
      sensitive
      path={`/movie/:category(${moviesPageValidPaths})`}
      component={MoviesPage}
    />,
    {},
    { route: '/movie/popular' }
  );

  await waitForDomChange();

  const target = getAllByTestId('movie-card')[0];
  fireEvent.click(target);
  expect(history.location.pathname).toBe('/movie/320288');
});
