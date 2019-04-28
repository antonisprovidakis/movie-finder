import axios from 'axios';

async function getPopularPersons(options = {}) {
    const persons = await axios.get('/api/person/popular', { params: options });
    return persons.data;
}

async function getPersonInfo(personId, options = {}) {
    const person = await axios.get(`/api/person/${personId}`, { params: options });
    return person.data;
}

export {
    getPopularPersons,
    getPersonInfo,
};
