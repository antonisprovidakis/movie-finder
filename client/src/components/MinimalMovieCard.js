import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import '../styles/MinimalMovieCard.css';

function MinimalMovieCard({ title, year, image }) {
    return (
        <Card
            className="MinimalMovieCard"
            fluid
            link
        >
            <Image
                className='MinimalMovieCard__image'
                src={image}
                // fluid
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
