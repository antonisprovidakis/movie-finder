import { parseQueryString } from '../base';

export default function getGenres(queryString, fallbackGenres = []) {
  const { withGenres: genres } = parseQueryString(queryString);

  if (!genres || !Array.isArray(genres)) {
    return fallbackGenres;
  }

  return genres;
}
