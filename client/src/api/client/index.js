import axios from 'axios';
import qs from 'query-string';

const client = axios.create({
    baseURL: '/api',
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' })
});

async function get(endpoint, options = {}) {
    const res = await client.get(endpoint, { params: options });
    return res.data;
}

export default {
    get
}
