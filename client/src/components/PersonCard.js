import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react';
import '../styles/PersonCard.css';
import { createImageSrc } from '../api/config/image';

function PersonCard({ id, name, image, sub = '', className = '' }) {
    return (
        <Card
            as={Link}
            to={`/person/${id}`}
            className={`PersonCard ${className}`}
            fluid
        >
            <Image
                className='PersonCard__image'
                src={createImageSrc({ path: image, type: 'profile', size: 'h632' })}
            />
            <Card.Content>
                <Card.Header>
                    <div className='PersonCard__name' title={name}>{name}</div>
                </Card.Header>
                {sub.length > 0 &&
                    <Card.Meta className='PersonCard__sub' title={sub}>{sub}</Card.Meta>
                }
            </Card.Content>
        </Card>
    );
}

export default PersonCard;
