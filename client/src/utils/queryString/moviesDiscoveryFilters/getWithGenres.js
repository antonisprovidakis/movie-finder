import { parseQueryString } from '../base';

const DEFAULT_GENRES_SELECTION = [];

export default function getWithGenres(queryString) {
  const { withGenres } = parseQueryString(queryString);

  if (!withGenres || !Array.isArray(withGenres)) {
    return DEFAULT_GENRES_SELECTION;
  }

  return withGenres;
}
