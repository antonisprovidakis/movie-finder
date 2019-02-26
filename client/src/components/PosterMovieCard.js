import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

import '../styles/PosterMovieCard.css';

function PosterMovieCard({ title, date, rating, image }) {
    return (
        <Card
            className="PosterMovieCard"
            fluid
            link
        >
            <Image
                className='PosterMovieCard__image'
                src={image}
            />
            <Card.Content>
                <Card.Header>
                    <div className='PosterMovieCard__title' title={title}>{title}</div>
                </Card.Header>
                <Card.Meta>
                    <div className='PosterMovieCard__date'>{date}</div>
                    <div className='PosterMovieCard__rating'>
                        <Icon name='star' color='yellow' /> {rating.toFixed(1)}
                    </div>
                </Card.Meta>
            </Card.Content>
        </Card>
    );
}

export default PosterMovieCard;
