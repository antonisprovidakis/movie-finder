import axios from 'axios';

async function searchMulti(query, options = {}) {
    options.query = query;

    const results = await axios.get(
        '/api/search/multi',
        { params: options }
    );
    return results.data;
}

export {
    searchMulti,
}
