import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import MoviesGrid from '../components/MoviesGrid';
import '../styles/Home.css';
import { movieAPI } from '../api';
import axios from 'axios';
import MoviesGridPlaceholder from '../components/MoviesGridPlaceholder';

function Home(props) {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    async function fetchMovies() {
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
            inTheatersMovies: inTheatersMovies.results.slice(0, 4),
            upcomingMovies: upcomingMovies.results.slice(0, 4),
            popularMovies: popularMovies.results.slice(0, 4),
            topRatedMovies: topRatedMovies.results.slice(0, 4),
        });
    }

    const sectionsData = [
        {
            title: 'Movies In Theaters',
            movies: (movies && movies.inTheatersMovies) || []
        },
        {
            title: 'Upcoming Movies',
            movies: (movies && movies.upcomingMovies) || []
        },
        {
            title: 'Popular Movies',
            movies: (movies && movies.popularMovies) || []
        },
        {
            title: 'Top Rated Movies',
            movies: (movies && movies.topRatedMovies) || []
        },
    ];

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

            <div className='Home__movies-container'>
                {movies
                    ?
                    sectionsData.map((sectionData, index) =>
                        <MoviesGrid
                            key={index}
                            title={sectionData.title}
                            movies={sectionData.movies}
                            columns={4}
                            doubling
                        />
                    )
                    :
                    sectionsData.map((sectionData, index) =>
                        <MoviesGridPlaceholder
                            key={index}
                            title={sectionData.title}
                            num={4}
                            columns={4}
                            doubling
                        />
                    )
                }
            </div>
        </div>
    );
}

export default Home;
