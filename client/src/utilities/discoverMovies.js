export function createQuery(primaryReleaseYear, sortBy, withGenres = []) {
    const sortedGenres = [...withGenres].sort((a, b) => a - b);
    return `primaryReleaseYear:${primaryReleaseYear}~sortBy:${sortBy}~withGenres:[${sortedGenres.join()}]`;
};
