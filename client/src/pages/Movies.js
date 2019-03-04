import React, { useState, useEffect } from 'react';
import MoviesGrid from '../components/MoviesGrid';
import '../styles/Movies.css';
import * as moviesAPI from '../api/moviesAPI';
import { routeNameToTitle } from '../utilities/routing/textUtils';

function Movies(props) {
    const type = props.match.params.type;
    const title = routeNameToTitle(type);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, [type]);

    async function fetchMovies() {
        const movies = await moviesAPI.all();
        setMovies(movies);
    }

    return (
        <div className="Movies">
            <div className="Movies__container">
                <MoviesGrid
                    movies={movies}
                    title={title}
                    tabletColumnWidthPerRow={4}
                />
            </div>
        </div>
    );
}

export default Movies;
