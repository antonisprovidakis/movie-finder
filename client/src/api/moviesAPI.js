import { movies } from './data/movies';

export function all() {
    return movies;
}

export function get(id) {
    return movies.find(movie => movie.id === id);
}
