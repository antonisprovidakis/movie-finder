import client from './client';

async function searchMulti(query, options = {}) {
    options.query = query;
    const results = await client.get('/search/multi', options);
    return results;
}

export default {
    searchMulti,
}
