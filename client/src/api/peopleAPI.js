import { people } from './data/people';

export function all() {
    return people;
}

export function get(id) {
    return people.find(person => person.id === id);
}
