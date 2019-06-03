export const MovieCategory = Object.freeze({
  POPULAR: 'popular',
  NOW_PLAYING: 'nowPlaying',
  UPCOMING: 'upcoming',
  TOP_RATED: 'topRated'
});

export const movieCategoriesRoutingMap = Object.freeze({
  popular: {
    slug: 'popular',
    text: 'Popular'
  },
  nowPlaying: {
    slug: 'now-playing',
    text: 'Now Playing'
  },
  upcoming: {
    slug: 'upcoming',
    text: 'Upcoming'
  },
  topRated: {
    slug: 'top-rated',
    text: 'Top Rated'
  }
});
