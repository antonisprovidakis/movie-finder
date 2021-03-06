import React from 'react';
import { fireEvent, act, waitForDomChange } from '@testing-library/react';
import { renderWithRouter } from '../../test/render';
import { searchAPI } from '../../api';
import QuickSearch from '../QuickSearch';

jest.mock('../../api');
jest.useFakeTimers();

beforeEach(() => searchAPI.searchMulti.mockClear());

it('should fetch 5 most relevant movies and persons (combined) based on search query and render them in a list', async () => {
  const first5MoviesAndPersonsTitles = [
    'The Matrix',
    'The Matrix Revolutions',
    'The Matrix Reloaded',
    'The Matrix Revisited',
    'Sexual Matrix'
  ];

  const { getByText, getByPlaceholderText } = renderWithRouter(
    <QuickSearch delay={0} />
  );

  const input = getByPlaceholderText(/Search for a movie or person/i);

  fireEvent.change(input, { target: { value: 'Matrix' } });

  act(() => {
    jest.runAllTimers();
  });

  expect(searchAPI.searchMulti).toHaveBeenCalledWith('Matrix', {
    language: 'en-US',
    region: 'US',
    page: 1
  });

  jest.useRealTimers();
  await waitForDomChange();
  jest.useFakeTimers();

  first5MoviesAndPersonsTitles.forEach(title =>
    expect(getByText(title)).toBeInTheDocument()
  );
});

it('should debounce searching for specified delay', () => {
  const delay = 300;

  const { getByPlaceholderText } = renderWithRouter(
    <QuickSearch delay={delay} />
  );

  const input = getByPlaceholderText(/search for a movie or person/i);

  expect(searchAPI.searchMulti).not.toHaveBeenCalled();

  fireEvent.change(input, { target: { value: 'Matrix' } });

  expect(searchAPI.searchMulti).not.toHaveBeenCalled();

  act(() => {
    jest.advanceTimersByTime(298);
  });

  expect(searchAPI.searchMulti).not.toHaveBeenCalled();

  act(() => {
    jest.runAllTimers();
  });

  expect(searchAPI.searchMulti).toHaveBeenCalledTimes(1);
});

it('should allow to clear search input', () => {
  const { queryByTitle, getByPlaceholderText } = renderWithRouter(
    <QuickSearch delay={0} />
  );

  const input = getByPlaceholderText(/Search for a movie or person/i);

  expect(queryByTitle(/clear/i)).not.toBeInTheDocument();
  expect(input.value).toBe('');

  fireEvent.change(input, { target: { value: 'Matrix' } });

  expect(queryByTitle(/clear/i)).toBeInTheDocument();
  expect(input.value).toBe('Matrix');

  fireEvent.click(queryByTitle(/clear/i));

  expect(queryByTitle(/clear/i)).not.toBeInTheDocument();
  expect(input.value).toBe('');
});

it("should navigate to resource's page if result is clicked", async () => {
  const { getByTestId, getByPlaceholderText, history } = renderWithRouter(
    <QuickSearch delay={0} />
  );

  const input = getByPlaceholderText(/Search for a movie or person/i);

  fireEvent.change(input, { target: { value: 'Matrix' } });

  act(() => {
    jest.runAllTimers();
  });

  jest.useRealTimers();
  await waitForDomChange();
  jest.useFakeTimers();

  const target = getByTestId('search-result-0');
  fireEvent.click(target);
  expect(history.location.pathname).toBe('/movie/603');
});

it("should navigate to resource's page if <enter> is pressed on result", async () => {
  const { getByTestId, getByPlaceholderText, history } = renderWithRouter(
    <QuickSearch delay={0} />
  );

  const input = getByPlaceholderText(/Search for a movie or person/i);

  fireEvent.change(input, { target: { value: 'Matrix' } });

  act(() => {
    jest.runAllTimers();
  });

  jest.useRealTimers();
  await waitForDomChange();
  jest.useFakeTimers();

  const target = getByTestId('search-result-0');
  fireEvent.keyDown(target, { key: 'ArrowDown', code: 40, charCode: 40 });
  fireEvent.keyDown(target, { key: 'Enter', code: 13, charCode: 13 });
  expect(history.location.pathname).toBe('/movie/603');
});
