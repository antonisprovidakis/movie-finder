import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react';
import Rating from './Rating';
import '../styles/PosterMovieCard.css';
import { createImageSrc } from '../api/config/image';
import { formatDate } from '../utilities/date';

function PosterMovieCard({ id, title, date, rating, image }) {
    return (
        <Card
            as={Link}
            to={`/movie/${id}`}
            className="PosterMovieCard"
            fluid
        >
            <Image
                className='PosterMovieCard__image'
                src={createImageSrc({ path: image, type: 'poster', size: 'w500' })}
            />
            <Card.Content>
                <Card.Header>
                    <div className='PosterMovieCard__title' title={title}>{title}</div>
                </Card.Header>
                <Card.Meta>
                    <div className='PosterMovieCard__date'>{formatDate(date)}</div>
                    <div className='PosterMovieCard__rating'>
                        <Rating value={rating.toFixed(1)} />
                    </div>
                </Card.Meta>
            </Card.Content>
        </Card>
    );
}

export default PosterMovieCard;
