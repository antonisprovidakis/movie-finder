import getGenres from '../getGenres';

it('should get single-element array of genres from single with_genres[] query string field', () => {
  const genres = getGenres('?withGenres[]=28');
  expect(genres).toHaveLength(1);
  expect(genres).toEqual(expect.arrayContaining(['28']));
});

it('should get array of genres from multiple with_genres[] query string fields', () => {
  const genres = getGenres('?withGenres[]=28&withGenres[]=35&withGenres[]=12');
  expect(genres).toHaveLength(3);
  expect(genres).toEqual(expect.arrayContaining(['28', '35', '12']));
});

it('should get fallback genres if with_genres query string fields are not postfixed with brackets', () => {
  const fallbackGenres = [];
  const genres = getGenres('?withGenres=28&withGenres=35', fallbackGenres);
  expect(genres).toEqual(fallbackGenres);
});

it('should get fallbackGenres if with_genres[] query string fields are missing', () => {
  const genres = getGenres(
    '?page=1&primary_release_year=2017&sort_by=popularity.desc'
  );
  expect(genres).toEqual([]);
});
