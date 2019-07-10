import { parseQueryString } from '../base';
import { SortingFilterType } from '../../../api/config';

const filters = Object.values(SortingFilterType);

export default function getSortingFilter(
  queryString,
  fallbackSortingFilter = SortingFilterType.POPULARITY_DESC
) {
  const { sortBy: sortingFilter } = parseQueryString(queryString);

  if (!filters.includes(sortingFilter)) {
    return fallbackSortingFilter;
  }

  return sortingFilter;
}
