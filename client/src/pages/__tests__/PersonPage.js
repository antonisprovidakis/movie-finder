import React from 'react';
import { Route } from 'react-router-dom';
import { renderWithReduxAndRouter } from '../../test/render';
import { personAPI } from '../../api';
import '../../test/matchMedia.mock';
import PersonPage from '../PersonPage';

jest.mock('../../api');

it('should make api call for person info', async () => {
  renderWithReduxAndRouter(
    <Route
      exact
      sensitive
      path="/person/:id([1-9]\d{0,})"
      component={PersonPage}
    />,
    {},
    { route: '/person/6384' }
  );

  expect(personAPI.getPersonInfo).toHaveBeenCalledTimes(1);
  expect(personAPI.getPersonInfo).toHaveBeenCalledWith(6384, {});
});
