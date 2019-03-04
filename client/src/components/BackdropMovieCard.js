import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react';
import Rating from './Rating';
import '../styles/BackdropMovieCard.css';
import { fullOverviewToCardView } from '../utilities/cards/textUtils';

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
                src={image}
            />
            <Card.Content>
                <Card.Header>
                    <div className='BackdropMovieCard__title' title={title}>{title}</div>
                </Card.Header>
                <Card.Meta>
                    <div className='BackdropMovieCard__date'>{date}</div>
                    <div className='BackdropMovieCard__rating'>
                        <Rating value={rating.toFixed(1)} />
                    </div>
                </Card.Meta>
                {showOverview && <Card.Description>
                    <div className='BackdropMovieCard__overview'>{fullOverviewToCardView(overview)}</div>
                </Card.Description>}
            </Card.Content>
        </Card>
    );
}

export default BackdropMovieCard;
