import { parseQueryString } from '../base';

const DEFAULT_YEAR = new Date().getFullYear() - 1;
const OLDEST_YEAR = 1900;

export default function getPrimaryReleaseYear(queryString) {
  const { primaryReleaseYear: primaryReleaseYearString } = parseQueryString(
    queryString
  );

  const primaryReleaseYear = parseInt(primaryReleaseYearString, 10);

  if (isNaN(primaryReleaseYear) || primaryReleaseYear > DEFAULT_YEAR) {
    return DEFAULT_YEAR;
  }

  if (primaryReleaseYear < OLDEST_YEAR) {
    return OLDEST_YEAR;
  }

  return primaryReleaseYear;
}
