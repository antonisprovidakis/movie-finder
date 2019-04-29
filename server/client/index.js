const client = require('./tmdb');

async function callAPI(endpoint, options = {}) {
    const res = await client.get(endpoint, { params: options });
    return res.data;
}

module.exports = {
    callAPI
}
