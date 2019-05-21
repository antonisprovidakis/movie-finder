import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react';
import Rating from './Rating';
import '../styles/BackdropMovieCard.css';
import { truncateOverview } from '../utils/movieCard';
import { formatDate } from '../utils/date';
import { createImageSrc } from '../api/config/image';

function BackdropMovieCard({ movie, showOverview = true, className = '' }) {
    const {
        id,
        title,
        release_date: date,
        backdrop_path: image,
        vote_average: rating,
        overview
    } = movie;

    return (
        <Card
            as={Link}
            to={`/movie/${id}`}
            className={`BackdropMovieCard ${className}`}
            fluid
        >
            <Image
                className='BackdropMovieCard__image'
                src={createImageSrc({ path: image, type: 'backdrop', size: 'w780' })}
            />
            <Card.Content>
                <Card.Header>
                    <div className='BackdropMovieCard__title' title={title}>{title}</div>
                </Card.Header>
                <Card.Meta>
                    <div className='BackdropMovieCard__date'>{formatDate(date)}</div>
                    <div className='BackdropMovieCard__rating'>
                        <Rating value={rating.toFixed(1)} />
                    </div>
                </Card.Meta>
                {showOverview && <Card.Description>
                    <div className='BackdropMovieCard__overview'>{truncateOverview(overview)}</div>
                </Card.Description>}
            </Card.Content>
        </Card>
    );
}

export default BackdropMovieCard;
