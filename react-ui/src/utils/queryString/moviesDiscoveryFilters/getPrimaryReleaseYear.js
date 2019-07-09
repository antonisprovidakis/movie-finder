import { parseQueryString } from '../base';

export default function getPrimaryReleaseYear(
  queryString,
  fallbackPrimaryReleaseYear = new Date().getFullYear()
) {
  const { primaryReleaseYear: primaryReleaseYearString } = parseQueryString(
    queryString
  );

  const primaryReleaseYear = parseInt(primaryReleaseYearString, 10);

  if (isNaN(primaryReleaseYear)) {
    return fallbackPrimaryReleaseYear;
  }

  return primaryReleaseYear;
}
