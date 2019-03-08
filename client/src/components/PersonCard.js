import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react';
import '../styles/PersonCard.css';
import { buildImageUrl, defaultImageBase64Data } from '../api/config/image';

function PersonCard({ id, name, image, sub = '' }) {
    return (
        <Card
            as={Link}
            to={`/person/${id}`}
            className="PersonCard"
            fluid
        >
            <Image
                className='PersonCard__image'
                src={(image && buildImageUrl({ path: image, type: 'profile', size: 'h632' })) || defaultImageBase64Data}
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
