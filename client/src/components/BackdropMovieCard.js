import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import '../styles/BackdropMovieCard.css';
import { fullOverviewToCardView } from '../utilities/cards/textUtils';

function BackdropMovieCard({ title, date, rating, image, overview, showOverview = true }) {
    return (
        <Card
            className="BackdropMovieCard"
            fluid
            link
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
                        <Icon name='star' color='yellow' /> {rating.toFixed(1)}
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
