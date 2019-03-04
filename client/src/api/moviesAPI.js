import { movies } from './data/movies';

export async function all() {
    return movies;
}

export async function get(id) {
    return movies.find(movie => movie.id === id);
}
