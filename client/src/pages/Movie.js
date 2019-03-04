import React, { useState, useEffect } from 'react';
import '../styles/Movie.css';
import * as moviesAPI from '../api/moviesAPI';
import * as peopleAPI from '../api/peopleAPI';
import { Grid, Image, Header, List, Label } from 'semantic-ui-react';
import Rating from '../components/Rating';
import PeopleGrid from '../components/PeopleGrid';

function Movie(props) {
    const id = parseInt(props.match.params.id);
    const [movie, setMovie] = useState(null);
    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetchMovie(id);
    }, [id]);

    async function fetchMovie(id) {
        const movie = await moviesAPI.get(id);
        // TODO: take first 4. Maybe this has to be done on the server?
        const people = (await peopleAPI.all()).slice(0, 4);
        setMovie(movie);
        setPeople(people);
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
                                src={movie.image}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <div className='Movie__title'>
                            <Header size='huge' className='Movie__title__name'>
                                {movie.title} <span className='Movie__title__year'>({movie.year})</span>
                            </Header>
                        </div>
                        <div className='Movie__actions'>
                            <Rating value={movie.rating.toFixed(1)} />
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
                                people={people}
                                title='Top Billed Cast'
                                mobileColumnWidthPerRow={8}
                                tabletColumnWidthPerRow={4}
                            />
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
                                    Released
                                    </List.Item>
                                <List.Item>
                                    <List.Header>Release Information</List.Header>
                                    {/* maybe a Label with the country flag also? */}
                                    November 16, 2018
                                    </List.Item>
                                <List.Item>
                                    <List.Header>Original Language</List.Header>
                                    {/* {movie.language} */}
                                    English
                                    </List.Item>
                                <List.Item>
                                    <List.Header>Runtime</List.Header>
                                    2h 10m
                                    </List.Item>
                                <List.Item>
                                    <List.Header>Budget</List.Header>
                                    $23.000.000
                                    </List.Item>
                                <List.Item>
                                    <List.Header>Revenue</List.Header>
                                    $63.000.000
                                    </List.Item>
                                <List.Item>
                                    <List.Header>Genres</List.Header>
                                    <Label.Group tag color='blue'>
                                        <Label>Drama</Label>
                                        <Label>Comedy</Label>
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
