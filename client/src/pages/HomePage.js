import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadMoviesByCategory } from '../redux/actions';
import _get from 'lodash/get';
import { Header, Button } from 'semantic-ui-react';
import CollectionGrid from '../components/CollectionGrid';
import '../styles/HomePage.css';
import MoviesGridPlaceholder from '../components/MoviesGridPlaceholder';
import PosterMovieCard from '../components/PosterMovieCard';

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
            movies: movies.popularMovies,
            linkTo: '/movie/popular'
        },
        {
            title: 'Movies In Theaters',
            movies: movies.inTheatersMovies,
            linkTo: '/movie/in-theaters'
        },
        {
            title: 'Upcoming Movies',
            movies: movies.upcomingMovies,
            linkTo: '/movie/upcoming'
        }
    ];

    function renderItem(item) {
        return <PosterMovieCard movie={item} />
    }

    function renderSection({ title, movies, linkTo }) {
        return (
            <div key={title} className='HomePage__movies-container__section'>
                {movies.length > 0
                    ?
                    <>
                        <div className='HomePage__movies-container__section__main'>
                            <CollectionGrid
                                title={title}
                                collection={movies}
                                renderItem={renderItem}
                                columns={4}
                                doubling
                            />
                        </div>
                        <div className='HomePage__movies-container__section__bottom'>
                            <Button
                                as={Link}
                                to={linkTo}
                                color='orange'
                                floated='right'
                            >
                                See More
                            </Button>
                        </div>
                    </>
                    :
                    <div className='HomePage__movies-container__section__main'>
                        <MoviesGridPlaceholder
                            title={title}
                            num={4}
                            columns={4}
                            doubling
                        />
                    </div>
                }
            </div>
        );
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
    const inTheatersMovieIds = _get(inTheatersMoviesSubTree, path, []).slice(0, 4);
    const upcomingMovieIds = _get(upcomingMoviesSubTree, path, []).slice(0, 4);
    const popularMovieIds = _get(popularMoviesSubTree, path, []).slice(0, 4);

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
