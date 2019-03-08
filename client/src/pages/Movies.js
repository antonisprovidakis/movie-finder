import React, { useState, useEffect } from 'react';
import MoviesGrid from '../components/MoviesGrid';
import '../styles/Movies.css';
import { movieAPI } from '../api';
import { routeNameToTitle } from '../utilities/routing';
import PosterMovieCard from '../components/PosterMovieCard';

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
                    ? <div>loading...</div>
                    :
                    <MoviesGrid
                        title={title}
                        columns={4}
                        doubling
                    >
                        {movies.map(movie =>
                            <PosterMovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                date={movie.release_date}
                                image={movie.poster_path}
                                rating={movie.vote_average}
                            />

                            // OR
                            //
                            // <BackdropMovieCard
                            //     key={movie.id}
                            //     id={movie.id}
                            //     title={movie.title}
                            //     date={movie.release_date}
                            //     rating={movie.vote_average}
                            //     image={movie.backdrop_path}
                            //     overview={movie.overview}
                            // />
                        )}
                    </MoviesGrid>
                }
            </div>
        </div>
    );
}

export default Movies;
