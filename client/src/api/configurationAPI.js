import client from './client';

async function getConfiguration() {
    const configuration = await client.get('/configuration');
    return configuration;
}

export default {
    getConfiguration
}
