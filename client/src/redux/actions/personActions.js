import { decamelizeKeys } from 'humps';
import Schemas from '../schemas';
import { personAPI } from '../../api';

const LOAD_PERSON_INFO_REQUEST = 'LOAD_PERSON_INFO_REQUEST';
const LOAD_PERSON_INFO_SUCCESS = 'LOAD_PERSON_INFO_SUCCESS';
const LOAD_PERSON_INFO_FAILURE = 'LOAD_PERSON_INFO_FAILURE';

export function loadPersonInfo(personId, requiredFields = [], options = {}) {
  return {
    types: [
      LOAD_PERSON_INFO_REQUEST,
      LOAD_PERSON_INFO_SUCCESS,
      LOAD_PERSON_INFO_FAILURE
    ],
    payload: { personId, options },
    schema: Schemas.PERSON,
    callAPI: () => personAPI.getPersonInfo(personId, decamelizeKeys(options)),
    shouldCallAPI: state => {
      const person = state.entities.persons[personId];

      if (person && requiredFields.every(key => person.hasOwnProperty(key))) {
        return false;
      }

      return true;
    }
  };
}

const LOAD_POPULAR_PERSONS_REQUEST = 'LOAD_POPULAR_PERSONS_REQUEST';
const LOAD_POPULAR_PERSONS_SUCCESS = 'LOAD_POPULAR_PERSONS_SUCCESS';
const LOAD_POPULAR_PERSONS_FAILURE = 'LOAD_POPULAR_PERSONS_FAILURE';

export function loadPopularPersons(options = {}) {
  return {
    types: [
      LOAD_POPULAR_PERSONS_REQUEST,
      LOAD_POPULAR_PERSONS_SUCCESS,
      LOAD_POPULAR_PERSONS_FAILURE
    ],
    payload: { options },
    schema: Schemas.PERSON_ARRAY,
    callAPI: () => personAPI.getPopularPersons(decamelizeKeys(options)),
    shouldCallAPI: state => {
      const pages = state.pagination.personsByPage.pages || {};
      const personIdsOfSelectedPage = pages[options.page || 1];
      return !personIdsOfSelectedPage;
    }
  };
}

export const PersonActionTypes = {
  LOAD_PERSON_INFO_REQUEST,
  LOAD_PERSON_INFO_SUCCESS,
  LOAD_PERSON_INFO_FAILURE,
  LOAD_POPULAR_PERSONS_REQUEST,
  LOAD_POPULAR_PERSONS_SUCCESS,
  LOAD_POPULAR_PERSONS_FAILURE
};
