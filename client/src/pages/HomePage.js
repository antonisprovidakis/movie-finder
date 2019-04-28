import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadMoviesByCategory } from '../redux/actions';
import get from 'lodash/get';
import { Header } from 'semantic-ui-react';
import MoviesGrid from '../components/MoviesGrid';
import '../styles/HomePage.css';
import MoviesGridPlaceholder from '../components/MoviesGridPlaceholder';

function loadData({ loadMoviesByCategory }) {
    const categories = ['popular', 'in-theaters', 'upcoming'];
    categories.forEach(category => loadMoviesByCategory(category, { page: 1, region: 'US' }));
}

function HomePage(props) {
    const { movies } = props;

    useEffect(() => {
        loadData(props);
    }, []);

    const sectionsData = [
        {
            title: 'Popular Movies',
            movies: movies.popularMovies
        },
        {
            title: 'Movies In Theaters',
            movies: movies.inTheatersMovies
        },
        {
            title: 'Upcoming Movies',
            movies: movies.upcomingMovies
        }
    ];

    function renderSection(sectionData) {
        const { title, movies } = sectionData;

        if (movies.length > 0) {
            return (
                <MoviesGrid
                    key={title}
                    title={title}
                    movies={movies}
                    columns={4}
                    doubling
                />
            );
        }
        else {
            return (
                <MoviesGridPlaceholder
                    key={title}
                    title={title}
                    num={4}
                    columns={4}
                    doubling
                />
            );
        }
    }

    return (
        <div className="HomePage">
            <Header
                className='HomePage__welcome-message'
                size='huge'
                textAlign='center'
                dividing
            >
                Welcome to Movie Finder
                <Header.Subheader>
                    Find information about any movie or actor/actress.
                </Header.Subheader>
            </Header>

            <div className='HomePage__movies-container'>
                {sectionsData.map(sectionData => renderSection(sectionData))}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const cachedMovies = state.entities.movies;

    const {
        'in-theaters': inTheatersMoviesSubTree = {},
        upcoming: upcomingMoviesSubTree = {},
        popular: popularMoviesSubTree = {},
    } = state.pagination.moviesByCategory;

    const path = 'pages[1]';
    const inTheatersMovieIds = get(inTheatersMoviesSubTree, path, []).slice(0, 4);
    const upcomingMovieIds = get(upcomingMoviesSubTree, path, []).slice(0, 4);
    const popularMovieIds = get(popularMoviesSubTree, path, []).slice(0, 4);

    const movies = {
        inTheatersMovies: inTheatersMovieIds.map(id => cachedMovies[id]),
        upcomingMovies: upcomingMovieIds.map(id => cachedMovies[id]),
        popularMovies: popularMovieIds.map(id => cachedMovies[id]),
    };

    return {
        movies
    }
}

export default connect(mapStateToProps, { loadMoviesByCategory })(HomePage);
