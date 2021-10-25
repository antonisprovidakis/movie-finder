import React from 'react';
import { fireEvent, waitForDomChange, within } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { renderWithReduxAndRouter } from '../../test/render';
import { movieAPI } from '../../api';
import '../../test/matchMedia.mock';
import DiscoverPage from '../DiscoverPage';

jest.mock('../../api');

beforeEach(() => {
  movieAPI.discoverMovies.mockClear();
  jest.restoreAllMocks()
});

it('should make api call for movies discovery', () => {
  const year = 2021;

  const mockDate = new Date(`${year}-10-25T10:00:00.000Z`);
  jest.spyOn(global, "Date").mockImplementation(() => mockDate);

  renderWithReduxAndRouter(
    <Route exact sensitive path="/discover" component={DiscoverPage} />,
    {},
    { route: '/discover' }
  );

  expect(movieAPI.discoverMovies).toHaveBeenCalledTimes(1);
  expect(movieAPI.discoverMovies).toHaveBeenCalledWith({
    primary_release_year: year,
    sort_by: 'popularity.desc',
    with_genres: [],
    page: 1
  });
});

it('should render page title', async () => {
  const { getByText } = renderWithReduxAndRouter(
    <Route exact sensitive path="/discover" component={DiscoverPage} />,
    {},
    { route: '/discover' }
  );

  expect(getByText(/discover new movies/i)).toBeInTheDocument();
});

it('should render a form with discovery filters', async () => {
  const { getByTestId } = renderWithReduxAndRouter(
    <Route exact sensitive path="/discover" component={DiscoverPage} />,
    {},
    { route: '/discover' }
  );

  const discoveryForm = getByTestId('discovery-form');
  expect(discoveryForm).toBeInTheDocument();

  const { getByLabelText } = within(discoveryForm);

  expect(discoveryForm).toContainElement(getByLabelText(/year/i));
  expect(discoveryForm).toContainElement(getByLabelText(/sort by/i));
  expect(discoveryForm).toContainElement(getByLabelText(/genres/i));
});

it('should render pagination after data is fetched', async () => {
  const { queryByTestId } = renderWithReduxAndRouter(
    <Route exact sensitive path="/discover" component={DiscoverPage} />,
    {},
    { route: '/discover' }
  );

  expect(queryByTestId('pagination')).not.toBeInTheDocument();
  await waitForDomChange();
  expect(queryByTestId('pagination')).toBeInTheDocument();
  expect(queryByTestId('pagination-active-page')).toHaveTextContent('1');
});

it("should navigate to movie's page if card is clicked", async () => {
  const { getAllByTestId, history } = renderWithReduxAndRouter(
    <Route exact sensitive path="/discover" component={DiscoverPage} />,
    {},
    { route: '/discover' }
  );

  await waitForDomChange();

  const target = getAllByTestId('movie-card')[0];
  fireEvent.click(target);
  expect(history.location.pathname).toBe('/movie/532321');
});
