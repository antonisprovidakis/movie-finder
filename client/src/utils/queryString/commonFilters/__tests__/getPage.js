import getPage from '../getPage';
import { MIN_PAGE } from '../../../../api/config/constants/page';

it('should get page from page query string field', () => {
  const input = 2;
  const page = getPage(`?page=${input}`);
  expect(page).toBe(input);
});

it('should get the fallback page if page query string field is missing', () => {
  const page = getPage(
    '?primary_release_year=2018&sort_by=popularity.desc&withGenres[]=28'
  );
  expect(page).toBe(MIN_PAGE);
});

it('should get the fallback page if page query string field is not between the boundaries defined by API', () => {
  const page = getPage('?page=1500&primary_release_year=2018');
  expect(page).toBe(MIN_PAGE);
});

it('should get the fallback page if page query string field is not a number', () => {
  const fallbackPage = 2;
  const page = getPage(
    '?page=some-random-value&primary_release_year=2018',
    fallbackPage
  );
  expect(page).toBe(fallbackPage);
});

it('should throw if fallback page is not between the boundaries defined by API', () => {
  expect(() => {
    getPage('?page=some-random-value&primary_release_year=2018', -1);
  }).toThrow();
});
