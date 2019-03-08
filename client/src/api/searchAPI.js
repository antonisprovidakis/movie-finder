import axios from 'axios';

async function searchMulti(query) {
    const results = await axios.get(`/api/search/multi?query=${query}`);
    return results;
}

export {
    searchMulti,
}
