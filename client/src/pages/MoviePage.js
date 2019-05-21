import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadMovieInfo } from '../redux/actions';
import '../styles/MoviePage.css';
import { Grid, Image, Header, List, Label, Flag } from 'semantic-ui-react';
import Rating from '../components/Rating';
import NotFound from '../components/NotFound';
import CollectionGrid from '../components/CollectionGrid';
import { findLanguageNameInEnglishFromISO } from '../api/config/language';
import { createImageSrc } from '../api/config/image';
import { formatDate } from '../utils/date';
import extractReleaseDatesForRegion from '../utils/extractReleaseDatesForRegion';
import PersonCard from '../components/PersonCard';

function MoviePage({ movieId, movie, loading, loadMovieInfo }) {
    useEffect(() => {
        loadMovieInfo(movieId, ['imdb_id'], { appendToResponse: ['credits', 'release_dates'] });
    }, [movieId]);

    if (loading) {
        // TODO: place a Loader here
        return <div>Loading...</div>;
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

    const top4Cast = movie.credits ? movie.credits.cast.slice(0, 4) : [];
    const titleDate = movie.release_date ? `(${movie.release_date.split('-')[0]})` : '';
    const releaseDates = extractReleaseDatesForRegion(movie, 'US');

    return (
        <div className="MoviePage">
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <div className='MoviePage__info__picture-container'>
                            <Image
                                className='MoviePage__info__picture'
                                src={createImageSrc({ path: movie.poster_path, type: 'poster', size: 'w500' })}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <div className='MoviePage__title'>
                            <Header size='huge' className='MoviePage__title__name'>
                                {movie.title} <span className='MoviePage__title__year'>{titleDate}</span>
                            </Header>
                        </div>
                        <div className='MoviePage__actions'>
                            <Rating value={movie.vote_average.toFixed(1)} />
                        </div>
                        <div className='MoviePage__overview'>
                            <Header
                                size='medium'
                                className='MoviePage__overview__header'
                            >
                                Overview
                            </Header>
                            <div className='MoviePage__overview__content'>
                                {movie.overview || 'There is not an overview yet.'}
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div className='MoviePage__cast'>
                            <CollectionGrid
                                title='Top Billed Cast'
                                columns={4}
                                doubling
                                collection={top4Cast}
                                renderItem={renderCastItem}
                                noResultsMessage={"We don't have any cast added to this movie."}
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
                                    {movie.status}
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
                                    {findLanguageNameInEnglishFromISO(movie.original_language)}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Runtime</List.Header>
                                    {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '-'}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Budget</List.Header>
                                    {movie.budget ? `$${movie.budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Revenue</List.Header>
                                    {movie.revenue ? `$${movie.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Genres</List.Header>
                                    <Label.Group tag color='blue'>
                                        {movie.genres && movie.genres.length > 0
                                            ? movie.genres // TMDb API returns duplicate genre objects, so remove them
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
    const movies = state.entities.movies;
    const movie = movies[movieId];
    const loading = state.ui.isFetchingMovieInfo;

    return {
        movieId,
        movie,
        loading,
    }
}

export default connect(mapStateToProps, { loadMovieInfo })(MoviePage);
