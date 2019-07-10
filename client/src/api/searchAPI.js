import client from './client';

async function searchMulti(query, options = {}) {
  options.query = query;
  return await client.get('/search/multi', options);
}

export default {
  searchMulti
};
