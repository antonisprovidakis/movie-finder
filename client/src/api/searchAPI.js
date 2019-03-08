import axios from 'axios';

async function searchMulti(query, params = {}) {
    params = { ...params, query };

    const results = await axios.get(
        '/api/search/multi',
        { params }
    );
    return results;
}

export {
    searchMulti,
}
