import getSortingFilter from '../getSortingFilter';
import { SortingFilterType } from '../../../../api/config';

it('should get filter from sort_by query string field', () => {
  const input = SortingFilterType.RELEASE_DATE_DESC;
  const filter = getSortingFilter(`?sort_by=${input}`);
  expect(filter).toBe(input);
});

it('should get fallback sorting filter if sort_by query string field is missing', () => {
  const fallbackSortingFilter = SortingFilterType.POPULARITY_DESC;
  const filter = getSortingFilter(
    '?page=1&primary_release_year=2017&withGenres[]=28',
    fallbackSortingFilter
  );
  expect(filter).toBe(fallbackSortingFilter);
});

it('should get fallback sorting filter if sort_by query string field value is an invalid value', () => {
  const filter = getSortingFilter('?sort_by=some-random-filter');
  expect(filter).toBe(SortingFilterType.POPULARITY_DESC);
});
