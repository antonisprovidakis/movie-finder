import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../../test/render';
import Nav from '../Nav';

it('should allow to navigate to homepage if logo is clicked', () => {
  const { getByTestId, history } = renderWithRouter(<Nav />, {
    route: '/movie/popular'
  });

  expect(history.location.pathname).toBe('/movie/popular');
  fireEvent.click(getByTestId('logo'));
  expect(history.location.pathname).toBe('/');
});

it('should allow to navigate to discover movies page', () => {
  const { getByText, history } = renderWithRouter(<Nav />, {
    route: '/'
  });

  expect(history.location.pathname).toBe('/');
  fireEvent.click(getByText(/discover/i));
  expect(history.location.pathname).toBe('/discover');
});

it('should allow to navigate to persons page', () => {
  const { getByText, history } = renderWithRouter(<Nav />, {
    route: '/'
  });

  expect(history.location.pathname).toBe('/');
  fireEvent.click(getByText(/people/i));
  expect(history.location.pathname).toBe('/person');
});

test.each([
  ['popular', 'Popular'],
  ['now-playing', 'Now Playing'],
  ['upcoming', 'Upcoming'],
  ['top-rated', 'Top Rated']
])('should allow to navigate to %s movies page', (slug, text) => {
  const { getByText, history } = renderWithRouter(<Nav />, {
    route: '/'
  });

  expect(history.location.pathname).toBe('/');
  fireEvent.click(getByText(new RegExp(text, 'i')));
  expect(history.location.pathname).toBe(`/movie/${slug}`);
});
