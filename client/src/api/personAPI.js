import client from './client';

async function getPopularPersons(options = {}) {
    const persons = await client.get('/person/popular', options);
    return persons;
}

async function getPersonInfo(personId, options = {}) {
    const person = await client.get(`/person/${personId}`, options);
    return person;
}

export default {
    getPopularPersons,
    getPersonInfo,
};
