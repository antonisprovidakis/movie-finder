function extractReleaseDatesForRegion(movie, region = 'US') {
    if (!movie.release_date) {
        return [];
    }

    const defaultReleaseDates = [movie.release_date];

    const releaseDatesObj = movie.release_dates;
    if (!releaseDatesObj || releaseDatesObj.results.length === 0) {
        return defaultReleaseDates;
    }

    const regionObject = releaseDatesObj.results.find(result => result.iso_3166_1 === region);
    if (!regionObject) {
        return defaultReleaseDates;
    }

    const releaseDates = regionObject.release_dates.map(
        releaseDateObj => releaseDateObj.release_date.split('T')[0]
    );

    return releaseDates;
}

export {
    extractReleaseDatesForRegion
}
