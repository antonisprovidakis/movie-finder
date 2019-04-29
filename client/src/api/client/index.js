import axios from 'axios';

const client = axios.create({ baseURL: '/api', });

async function callAPI(endpoint, options = {}) {
    const res = await client.get(endpoint, { params: options });
    return res.data;
}

export {
    callAPI
}
