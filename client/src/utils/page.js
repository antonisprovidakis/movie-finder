// FROM TMDB API.
const MIN_PAGE = 1;
const MAX_PAGE = 1000;
const DEFAULT_PAGE = 1;

export function extractPageFromQueryString(queryString) {
    const params = new URLSearchParams(queryString);
    const pageString = params.get('page');

    if (!pageString) {
        return null;
    }

    const page = Number(pageString);

    if (!Number.isInteger(page)) {
        return null;
    }

    return page;
}

export function determinePage(page) {
    if (!page) {
        return DEFAULT_PAGE;
    }

    if (page < MIN_PAGE) {
        return DEFAULT_PAGE;
    }

    if (page > MAX_PAGE) {
        return DEFAULT_PAGE;
    }

    return page;
}
