import axios from 'axios';

async function getPopularPeople(params = {}) {
    const people = await axios.get('/api/person/popular', { params });
    return people;
}

async function getPersonInfo(personId, params = {}) {
    const person = await axios.get(`/api/person/${personId}`, { params });
    return person;
}

export {
    getPopularPeople,
    getPersonInfo,
};
