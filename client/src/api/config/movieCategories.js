import { camelize } from 'humps';

export const MovieCategory = Object.freeze({
    POPULAR: 'popular',
    IN_THEATERS: 'inTheaters',
    UPCOMING: 'upcoming',
    TOP_RATED: 'topRated'
});


export const movieCategoriesRoutingMap = Object.freeze({
    popular: {
        slug: 'popular',
        text: 'Popular'
    },
    inTheaters: {
        slug: 'in-theaters',
        text: 'In Theaters'
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

export function camelizeCategory(categorySlug) {
    return camelize(categorySlug);
}
