import axios from 'axios';

async function getPopularPersons(params = {}) {
    const persons = await axios.get('/api/person/popular', { params });
    return persons.data;
}

async function getPersonInfo(personId, params = {}) {
    const person = await axios.get(`/api/person/${personId}`, { params });
    return person.data;
}

export {
    getPopularPersons,
    getPersonInfo,
};
