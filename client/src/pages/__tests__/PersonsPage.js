import React from 'react';
import { fireEvent, waitForDomChange } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { renderWithReduxAndRouter } from '../../test/render';
import { personAPI } from '../../api';
import '../../test/matchMedia.mock';
import PersonsPage from '../PersonsPage';

jest.mock('../../api');

it('should make api call for popular persons', () => {
  renderWithReduxAndRouter(
    <Route component={PersonsPage} />,
    {},
    { route: '/person' }
  );

  expect(personAPI.getPopularPersons).toHaveBeenCalledTimes(1);
  expect(personAPI.getPopularPersons).toHaveBeenCalledWith({ page: 1 });
});

it('should render collection title', () => {
  const { getByText } = renderWithReduxAndRouter(
    <Route component={PersonsPage} />,
    {},
    { route: '/person' }
  );

  expect(getByText(/popular people/i)).toBeInTheDocument();
});

it('should render a placeholder grid before data is fetched', async () => {
  const { getByTestId } = renderWithReduxAndRouter(
    <Route component={PersonsPage} />,
    {},
    { route: '/person' }
  );

  expect(getByTestId('grid-placeholder')).toBeInTheDocument();
});

it('should render a grid of persons after data is fetched', async () => {
  const { getByTestId, getAllByTestId } = renderWithReduxAndRouter(
    <Route component={PersonsPage} />,
    {},
    { route: '/person' }
  );

  await waitForDomChange();
  expect(getByTestId('grid')).toBeInTheDocument();
  expect(getAllByTestId('grid-item').length).toBe(20);
});

it('should render pagination after data is fetched', async () => {
  const { queryByTestId } = renderWithReduxAndRouter(
    <Route component={PersonsPage} />,
    {},
    { route: '/person' }
  );

  expect(queryByTestId('pagination')).not.toBeInTheDocument();
  await waitForDomChange();
  expect(queryByTestId('pagination')).toBeInTheDocument();
  expect(queryByTestId('pagination-active-page')).toHaveTextContent('1');
});

it("should navigate to person's page if card is clicked", async () => {
  const { getAllByTestId, history } = renderWithReduxAndRouter(
    <Route component={PersonsPage} />,
    {},
    { route: '/person' }
  );

  await waitForDomChange();

  const target = getAllByTestId('person-card')[2];
  fireEvent.click(target);
  expect(history.location.pathname).toBe('/person/6384');
});
