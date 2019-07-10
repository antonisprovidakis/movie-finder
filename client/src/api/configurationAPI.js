import client from './client';

async function getConfiguration() {
  return await client.get('/configuration');
}

export default {
  getConfiguration
};
