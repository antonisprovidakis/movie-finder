import axios from 'axios';

async function getPopularPeople() {
    const people = await axios.get('/api/person/popular');
    return people;
}

async function getPersonInfo(personId) {
    const person = await axios.get(`/api/person/${personId}`);
    return person;
}

export {
    getPopularPeople,
    getPersonInfo,
};
