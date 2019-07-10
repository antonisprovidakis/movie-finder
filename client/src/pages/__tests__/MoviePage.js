import React from 'react';
import { fireEvent, waitForDomChange } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { renderWithReduxAndRouter } from '../../test/render';
import { movieAPI } from '../../api';
import '../../test/matchMedia.mock';
import MoviePage from '../MoviePage';

jest.mock('../../api');

it('should make api call for movie info', async () => {
  renderWithReduxAndRouter(
    <Route
      exact
      sensitive
      path="/movie/:id([1-9]\d{0,})"
      component={MoviePage}
    />,
    {},
    { route: '/movie/603' }
  );

  expect(movieAPI.getMovieInfo).toHaveBeenCalledTimes(1);
  expect(movieAPI.getMovieInfo).toHaveBeenCalledWith(603, {
    append_to_response: ['credits', 'release_dates']
  });
});

it("should navigate to person's page if cast card is clicked", async () => {
  const { getAllByTestId, history } = renderWithReduxAndRouter(
    <Route
      exact
      sensitive
      path="/movie/:id([1-9]\d{0,})"
      component={MoviePage}
    />,
    {},
    { route: '/movie/603' }
  );

  await waitForDomChange();

  const target = getAllByTestId('person-card')[0];
  fireEvent.click(target);
  expect(history.location.pathname).toBe('/person/6384');
});
