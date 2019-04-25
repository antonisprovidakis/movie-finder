import axios from 'axios';

async function getConfiguration() {
    const configuration = await axios.get(
        '/api/configuration'
    );
    return configuration.data;
}

export {
    getConfiguration,
}
