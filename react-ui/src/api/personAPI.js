import client from './client';

async function getPopularPersons(options = {}) {
  return await client.get('/person/popular', options);
}

async function getPersonInfo(personId, options = {}) {
  return await client.get(`/person/${personId}`, options);
}

export default {
  getPopularPersons,
  getPersonInfo
};
