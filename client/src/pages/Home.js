import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import MoviesGrid from '../components/MoviesGrid';
import '../styles/Home.css';
import { movieAPI } from '../api';
import axios from 'axios';

const initialState = {
    inTheatersMovies: [],
    upcomingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
}

function Home(props) {
    const [movies, setMovies] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    async function fetchMovies() {
        setLoading(true);

        const [
            inTheatersMovies,
            upcomingMovies,
            popularMovies,
            topRatedMovies,
        ] = await axios.all([
            movieAPI.getInTheatersMovies(),
            movieAPI.getUpcomingMovies(),
            movieAPI.getPopularMovies(),
            movieAPI.getTopRatedMovies(),
        ]);

        setMovies({
            inTheatersMovies: inTheatersMovies.data.results.slice(0, 4),
            upcomingMovies: upcomingMovies.data.results.slice(0, 4),
            popularMovies: popularMovies.data.results.slice(0, 4),
            topRatedMovies: topRatedMovies.data.results.slice(0, 4),
        });

        setLoading(false);
    }

    return (
        <div className="Home">
            <Header
                className='Home__welcome-message'
                size='huge'
                textAlign='center'
                dividing
            >
                Welcome to Movie Finder
                <Header.Subheader>
                    Find information about any movie or actor/actress.
                </Header.Subheader>
            </Header>

            {loading
                // TODO: place a Loader here
                ? <div>loading...</div>
                :
                <>
                    <div className="Home__in-theaters">
                        <MoviesGrid
                            title='Movies In Theaters'
                            columns={4}
                            doubling
                            movies={movies.inTheatersMovies}
                        />
                    </div>

                    <div className="Home__upcoming">
                        <MoviesGrid
                            title='Upcoming Movies'
                            columns={4}
                            doubling
                            movies={movies.upcomingMovies}
                        />
                    </div>

                    <div className="Home__popular">
                        <MoviesGrid
                            title='Popular Movies'
                            columns={4}
                            doubling
                            movies={movies.popularMovies}
                        />
                    </div>

                    <div className="Home__top-rated">
                        <MoviesGrid
                            title='Top Rated Movies'
                            columns={4}
                            doubling
                            movies={movies.topRatedMovies}
                        />
                    </div>
                </>
            }
        </div>
    );
}

export default Home;
