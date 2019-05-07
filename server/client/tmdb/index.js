const axios = require('axios');
const qs = require('qs');

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        'api_key': process.env.TMDB_API_KEY,
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' })
});

async function get(endpoint, options = {}) {
    const res = await tmdb.get(endpoint, { params: options });
    return res.data;
}

module.exports = {
    get
}
