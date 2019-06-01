import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadMovieInfo } from '../redux/actions/movieActions';
import '../styles/MoviePage.css';
import { Grid, Image, Header, List, Label, Flag } from 'semantic-ui-react';
import Rating from '../components/Rating';
import NotFound from '../components/NotFound';
import Loader from '../components/Loader';
import CollectionGrid from '../components/CollectionGrid';
import { findLanguageNameInEnglishFromISO } from '../api/config/language';
import { createImageSrc } from '../api/config/image';
import { formatDate } from '../utils/date';
import extractReleaseDatesForRegion from '../utils/extractReleaseDatesForRegion';
import PersonCard from '../components/PersonCard';

function MoviePage({ movieId, movie, isFetching, loadMovieInfo }) {
    useEffect(() => {
        loadMovieInfo(
            movieId,
            { appendToResponse: ['credits', 'release_dates'] },
            ['imdb_id']
        );
    }, [loadMovieInfo, movieId]);

    if (isFetching) {
        return <Loader />;
    }

    if (!movie) {
        return <NotFound />;
    }

    function renderCastItem(item) {
        const {
            id,
            name,
            profile_path: image,
            character: sub
        } = item;
        return <PersonCard id={id} name={name} image={image} sub={sub} />
    }

    const {
        title,
        overview,
        credits,
        release_date: releaseDate,
        poster_path: imagePath,
        vote_average: voteAverage,
        vote_count: voteCount,
        status,
        original_language: originalLanguage,
        runtime,
        budget,
        revenue,
        genres
    } = movie;

    const top4Cast = credits ? credits.cast.slice(0, 4) : [];
    const titleDate = releaseDate ? `(${releaseDate.split('-')[0]})` : '';
    const releaseDates = extractReleaseDatesForRegion(movie, 'US');
    const rating = voteCount > 0 ? voteAverage : undefined;

    return (
        <div className="MoviePage">
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <div className='MoviePage__info__picture-container'>
                            <Image
                                className='MoviePage__info__picture'
                                src={createImageSrc({
                                    path: imagePath,
                                    type: 'poster',
                                    size: 'w500'
                                })}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <div className='MoviePage__title'>
                            <Header size='huge' className='MoviePage__title__name'>
                                {title} <span className='MoviePage__title__year'>{titleDate}</span>
                            </Header>
                        </div>
                        <div className='MoviePage__actions'>
                            <Rating value={rating} />
                        </div>
                        <div className='MoviePage__overview'>
                            <Header
                                size='medium'
                                className='MoviePage__overview__header'
                            >
                                Overview
                            </Header>
                            <div className='MoviePage__overview__content'>
                                {overview || 'There is not an overview yet.'}
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div className='MoviePage__cast'>
                            <CollectionGrid
                                title='Top Billed Cast'
                                collection={top4Cast}
                                renderItem={renderCastItem}
                                noResultsMessage={"We don't have any cast added to this movie."}
                                columns={4}
                                doubling
                            />
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div className='MoviePage__facts'>
                            <Header
                                size='medium'
                                className='MoviePage__facts_header'
                            >
                                Facts
                            </Header>

                            <List relaxed='very'>
                                <List.Item>
                                    <List.Header>Status</List.Header>
                                    {status}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Release Information</List.Header>
                                    {releaseDates.length > 0
                                        ? releaseDates.map(
                                            date => (
                                                <List.Item key={date}>
                                                    <Flag name={'US'.toLowerCase()} />{formatDate(date)}
                                                </List.Item>
                                            )
                                        )
                                        : '-'
                                    }
                                </List.Item>
                                <List.Item>
                                    <List.Header>Original Language</List.Header>
                                    {findLanguageNameInEnglishFromISO(originalLanguage)}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Runtime</List.Header>
                                    {runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}m` : '-'}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Budget</List.Header>
                                    {budget ? `$${budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Revenue</List.Header>
                                    {revenue ? `$${revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Genres</List.Header>
                                    <Label.Group tag color='blue'>
                                        {genres && genres.length > 0
                                            ? genres // TMDb API returns duplicate genre objects, so remove them
                                                .filter((genre, index, arr) =>
                                                    arr.map(mapObj => mapObj.id).indexOf(genre.id) === index
                                                )
                                                .map(genre => <Label key={genre.id}>{genre.name}</Label>)
                                            : 'No genres have been added.'
                                        }
                                    </Label.Group>
                                </List.Item>
                            </List>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const movieId = parseInt(ownProps.match.params.id);
    const cachedMovies = state.entities.movies;
    const movie = cachedMovies[movieId];
    const isFetching = state.ui.isFetchingMovieInfo;

    return {
        movieId,
        movie,
        isFetching,
    }
}

MoviePage.propTypes = {
    movieId: PropTypes.number.isRequired,
    movie: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    loadMovieInfo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { loadMovieInfo })(MoviePage);
