import { parseQueryString } from '../base';

// FROM TMDB API.
const MIN_PAGE = 1;
const MAX_PAGE = 1000;
const DEFAULT_PAGE = 1;

export default function getPage(queryString) {
  const { page: pageString } = parseQueryString(queryString);
  const page = parseInt(pageString, 10);

  if (isNaN(page) || page < MIN_PAGE || page === 0 || page > MAX_PAGE) {
    return DEFAULT_PAGE;
  }

  return page;
}
