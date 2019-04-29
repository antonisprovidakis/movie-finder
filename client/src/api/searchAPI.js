import { callAPI } from './client';

async function searchMulti(query, options = {}) {
    options.query = query;
    const results = await callAPI('/search/multi', options);
    return results;
}

export {
    searchMulti,
}
