import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react';
import Rating from './Rating';
import '../styles/BackdropMovieCard.css';
import { trimOverview } from '../utilities/text';
import { formatDate } from '../utilities/date';
import { buildImageUrl, defaultImageBase64Data } from '../api/config/image';

function BackdropMovieCard({ id, title, date, rating, image, overview, showOverview = true }) {
    return (
        <Card
            as={Link}
            to={`/movies/${id}`}
            className="BackdropMovieCard"
            fluid
        >
            <Image
                className='BackdropMovieCard__image'
                src={(image && buildImageUrl({ path: image, type: 'backdrop', size: 'w780' })) || defaultImageBase64Data}
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
                    <div className='BackdropMovieCard__overview'>{trimOverview(overview)}</div>
                </Card.Description>}
            </Card.Content>
        </Card>
    );
}

export default BackdropMovieCard;
