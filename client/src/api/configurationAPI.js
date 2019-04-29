import { callAPI } from './client';

async function getConfiguration() {
    const configuration = await callAPI('/configuration');
    return configuration;
}

export {
    getConfiguration,
}
