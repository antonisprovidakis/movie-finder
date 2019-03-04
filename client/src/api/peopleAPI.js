import { people } from './data/people';

export async function all() {
    return people;
}

export async function get(id) {
    return people.find(person => person.id === id);
}
