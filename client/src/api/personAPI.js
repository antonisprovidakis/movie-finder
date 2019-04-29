import { callAPI } from './client';

async function getPopularPersons(options = {}) {
    const persons = await callAPI('/person/popular', options);
    return persons;
}

async function getPersonInfo(personId, options = {}) {
    const person = await callAPI(`/person/${personId}`, options);
    return person;
}

export {
    getPopularPersons,
    getPersonInfo,
};
