import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react';
import '../styles/MinimalMovieCard.css';

function MinimalMovieCard({ id, title, year, image }) {
    return (
        <Card
            as={Link}
            to={`/movies/${id}`}
            className="MinimalMovieCard"
            fluid
        >
            <Image
                className='MinimalMovieCard__image'
                src={image}
            />
            <Card.Content>
                <Card.Header>
                    <div className='MinimalMovieCard__title' title={title}>{title}</div>
                </Card.Header>
                <Card.Meta>
                    <span className='MinimalMovieCard__year'>{year}</span>
                </Card.Meta>
            </Card.Content>
        </Card>
    );
}

export default MinimalMovieCard;
