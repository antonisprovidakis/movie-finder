import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import '../styles/PersonCard.css';

function PersonCard({ name, image }) {
    return (
        <Card
            className="PersonCard"
            fluid
            link
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
