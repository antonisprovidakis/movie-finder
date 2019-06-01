import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/HomePage.css';
import _get from 'lodash/get';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, Header } from 'semantic-ui-react';
import CollectionGrid from '../components/CollectionGrid';
import PosterMovieCard from '../components/PosterMovieCard';
import PosterMovieCardPlaceholder from '../components/PosterMovieCardPlaceholder';
import { loadMoviesByCategory } from '../redux/actions/movieActions';

function HomePage({
    popularMovies,
    inTheatersMovies,
    upcomingMovies,
    loadMoviesByCategory
}) {
    useEffect(() => {
        const categories = ['popular', 'in-theaters', 'upcoming'];
        categories.forEach(category =>
            loadMoviesByCategory(category, { page: 1, region: 'US' })
        );
    }, [loadMoviesByCategory]);

    const sectionsData = [
        {
            title: 'Popular Movies',
            movies: popularMovies,
            linkTo: '/movie/popular'
        },
        {
            title: 'Movies In Theaters',
            movies: inTheatersMovies,
            linkTo: '/movie/in-theaters'
        },
        {
            title: 'Upcoming Movies',
            movies: upcomingMovies,
            linkTo: '/movie/upcoming'
        }
    ];

    function renderItem(item) {
        return <PosterMovieCard movie={item} />
    }

    function renderPlaceholderItem() {
        return <PosterMovieCardPlaceholder />;
    }

    function renderSection({ title, movies, linkTo }) {
        return (
            <div key={title} className='HomePage__movies-container__section'>
                <div className='HomePage__movies-container__section__main'>
                    <CollectionGrid
                        title={title}
                        collection={movies}
                        renderItem={renderItem}
                        placeholderItemsCount={4}
                        renderPlaceholderItem={renderPlaceholderItem}
                        loading={movies.length === 0}
                        columns={4}
                        doubling
                    />
                </div>
                {
                    movies.length !== 0 &&
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

    const popularMovies = popularMovieIds.map(id => cachedMovies[id]);
    const inTheatersMovies = inTheatersMovieIds.map(id => cachedMovies[id]);
    const upcomingMovies = upcomingMovieIds.map(id => cachedMovies[id]);

    return {
        popularMovies,
        inTheatersMovies,
        upcomingMovies
    }
}

HomePage.propTypes = {
    popularMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    inTheatersMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    upcomingMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadMoviesByCategory: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
    loadMoviesByCategory
})(HomePage);
