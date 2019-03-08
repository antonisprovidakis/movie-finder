import React, { useState, useEffect } from 'react';
import MoviesGrid from '../components/MoviesGrid';
import '../styles/Movies.css';
import { movieAPI } from '../api';
import { routeNameToTitle } from '../utilities/routing';

function Movies(props) {
    const category = props.match.params.category;
    const title = routeNameToTitle(category);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMovies(category);
    }, [category]);

    async function fetchMovies(category) {
        setLoading(true);
        const res = await movieAPI.getMoviesByCategory(category);
        const movies = res.data.results;
        setMovies(movies);
        setLoading(false);
    }

    return (
        <div className="Movies">
            <div className="Movies__container">
                {loading
                    ? 'Loading...'
                    :
                    <MoviesGrid
                        movies={movies}
                        title={title}
                        mobileColumnWidthPerRow={8}
                        tabletColumnWidthPerRow={4}
                    />
                }
            </div>
        </div>
    );
}

export default Movies;
