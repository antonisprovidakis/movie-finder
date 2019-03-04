import React from 'react';
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react';
import '../styles/PersonCard.css';

function PersonCard({ id, name, image }) {
    return (
        <Card
            as={Link}
            to={`/people/${id}`}
            className="PersonCard"
            fluid
        >
            <Image
                className='PersonCard__image'
                src={image}
            />
            <Card.Content>
                <Card.Header>
                    <div className='PersonCard__name' title={name}>{name}</div>
                </Card.Header>
            </Card.Content>
        </Card>
    );
}

export default PersonCard;
