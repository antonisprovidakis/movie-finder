import React, { useState, useEffect } from 'react';
import '../styles/Movie.css';
import { Grid, Image, Header, List, Label } from 'semantic-ui-react';
import Rating from '../components/Rating';
import PeopleGrid from '../components/PeopleGrid';
import { movieAPI } from '../api';
import { findLanguageFromISO } from '../api/config/language';
import { buildImageUrl } from '../api/config/image';
import { formatDate } from '../utilities/date';
import PersonCard from '../components/PersonCard';


function Movie(props) {
    const id = parseInt(props.match.params.id);
    const [movie, setMovie] = useState(null);
    const [top4Cast, setTop4Cast] = useState([]);

    useEffect(() => {
        fetchMovie(id);
    }, [id]);

    async function fetchMovie(id) {
        const res = await movieAPI.getMovieInfo(id);
        const movie = res.data;
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
        <div className="Movie">
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <div className='Movie__info__picture-container'>
                            <Image
                                className='Movie__info__picture'
                                src={buildImageUrl({ path: movie.poster_path, type: 'poster', size: 'w500' })}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <div className='Movie__title'>
                            <Header size='huge' className='Movie__title__name'>
                                {movie.title} <span className='Movie__title__year'>({movie.release_date.split('-')[0]})</span>
                            </Header>
                        </div>
                        <div className='Movie__actions'>
                            <Rating value={movie.vote_average.toFixed(1)} />
                        </div>
                        <div className='Movie__overview'>
                            <Header
                                size='medium'
                                className='Movie__overview__header'
                            >
                                Overview
                            </Header>
                            <div className='Movie__overview__content'>
                                {movie.overview}
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div className='Movie__cast'>
                            <PeopleGrid
                                title='Top Billed Cast'
                                columns={4}
                                doubling
                            >
                                {top4Cast.map(person =>
                                    <PersonCard
                                        key={person.id}
                                        id={person.id}
                                        name={person.name}
                                        image={person.profile_path}
                                    />
                                )}
                            </PeopleGrid>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div className='Movie__facts'>
                            <Header
                                size='medium'
                                className='Movie__facts_header'
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
                                        {movie.genres.map((genre) =>
                                            <Label key={genre.name}>{genre.name}</Label>)
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

export default Movie;
