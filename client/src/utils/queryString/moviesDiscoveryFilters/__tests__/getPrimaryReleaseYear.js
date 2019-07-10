import getPrimaryReleaseYear from '../getPrimaryReleaseYear';

it('should get primary release year from primary_release_year query string field', () => {
  const primaryReleaseYear = getPrimaryReleaseYear(
    '?primary_release_year=2017'
  );
  expect(primaryReleaseYear).toBe(2017);
});

it('should get primary release year (int) from float primary_release_year query string field', () => {
  const primaryReleaseYear = getPrimaryReleaseYear(
    '?primary_release_year=2017.48'
  );
  expect(primaryReleaseYear).toBe(2017);
});

it('should get fallback primary release year if primary_release_year query string field is not a number', () => {
  const fallbackPrimaryReleaseYear = 2000;
  const primaryReleaseYear = getPrimaryReleaseYear(
    '?primary_release_year=some-random-value',
    fallbackPrimaryReleaseYear
  );
  expect(primaryReleaseYear).toBe(fallbackPrimaryReleaseYear);
});

it('should get fallback primary release year if primary_release_year query string field is missing', () => {
  const currentYear = new Date().getFullYear();
  const primaryReleaseYear = getPrimaryReleaseYear(
    '?page=1&sort_by=popularity.desc&withGenres[]=28'
  );
  expect(primaryReleaseYear).toBe(currentYear);
});
