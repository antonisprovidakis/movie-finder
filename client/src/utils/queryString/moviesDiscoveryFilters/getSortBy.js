import { parseQueryString } from '../base';
import { sortingFilters } from '../../../api/config';

const filters = sortingFilters.map(filter => filter.id);
const DEFAULT_SORTING_FILTER = filters[0];

export default function getSortBy(queryString) {
    const { sortBy } = parseQueryString(queryString);

    if (!filters.includes(sortBy)) {
        return DEFAULT_SORTING_FILTER;
    }

    return sortBy;
}
