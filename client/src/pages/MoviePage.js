import React, { useState, useEffect } from 'react';
import '../styles/MoviePage.css';
import { Grid, Image, Header, List, Label } from 'semantic-ui-react';
import Rating from '../components/Rating';
import PersonsGrid from '../components/PersonsGrid';
import { movieAPI } from '../api';
import { findLanguageFromISO } from '../api/config/language';
import { createImageSrc } from '../api/config/image';
import { formatDate } from '../utilities/date';

function MoviePage(props) {
    const id = parseInt(props.match.params.id);
    const [movie, setMovie] = useState(null);
    const [top4Cast, setTop4Cast] = useState([]);

    useEffect(() => {
        fetchMovie(id);
    }, [id]);

    async function fetchMovie(id) {
        const movie = await movieAPI.getMovieInfo(id, { append_to_response: 'credits' });
        // TODO: take first 4. Maybe this has to be done on the server?
        const top4Cast = movie.credits.cast.slice(0, 4);
        setMovie(movie);
        setTop4Cast(top4Cast);
    }

    if (!movie) {
        // TODO: place a Loader here
        return <div>Loading...</div>;
    }

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
                                {movie.title} <span className='MoviePage__title__year'>({movie.release_date.split('-')[0]})</span>
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
                                {movie.overview}
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div className='MoviePage__cast'>
                            <PersonsGrid
                                title='Top Billed Cast'
                                columns={4}
                                doubling
                                persons={top4Cast}
                                forCast
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
                                    {formatDate(movie.release_date)}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Original Language</List.Header>
                                    {findLanguageFromISO(movie.original_language).english_name}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Runtime</List.Header>
                                    {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Budget</List.Header>
                                    {`$${movie.budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Revenue</List.Header>
                                    {`$${movie.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                </List.Item>
                                <List.Item>
                                    <List.Header>Genres</List.Header>
                                    <Label.Group tag color='blue'>
                                        {movie.genres
                                            // TMDb API returns duplicate genre objects, so remove them
                                            .filter((genre, index, arr) =>
                                                arr.map(mapObj => mapObj.id).indexOf(genre.id) === index
                                            )
                                            .map(genre =>
                                                <Label key={genre.id}>{genre.name}</Label>
                                            )
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

export default MoviePage;