import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import MoviesGrid from '../components/MoviesGrid';
import '../styles/Home.css';
import * as moviesAPI from '../api/moviesAPI';

function Home(props) {
    const [movies, setMovies] = useState([]);
    // TODO: different state for each movie type?

    useEffect(() => {
        fetchMovies();
    }, []);

    async function fetchMovies() {
        const movies = await moviesAPI.all();
        setMovies(movies);
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

            <div className="Home__in-theaters">
                <MoviesGrid
                    movies={movies}
                    title='Movies In Theaters'
                    tabletColumnWidthPerRow={4}
                />
            </div>

            <div className="Home__upcoming">
                <MoviesGrid
                    movies={movies}
                    title='Upcoming Movies'
                    tabletColumnWidthPerRow={4}
                />
            </div>

            <div className="Home__popular">
                <MoviesGrid
                    movies={movies}
                    title='Popular Movies'
                    tabletColumnWidthPerRow={4}
                />
            </div>
        </div>
    );
}

export default Home;
