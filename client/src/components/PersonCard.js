import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react';
import '../styles/PersonCard.css';
import { createImageSrc } from '../api/config/image';

function PersonCard({ id, name, image, sub, className }) {
    return (
        <Card
            as={Link}
            to={`/person/${id}`}
            className={`PersonCard ${className}`}
            fluid
        >
            <Image
                className='PersonCard__image'
                src={createImageSrc({
                    path: image,
                    type: 'profile',
                    size: 'h632'
                })}
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

PersonCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    sub: PropTypes.string,
    className: PropTypes.string,
}

PersonCard.defaultProps = {
    sub: '',
    className: ''
}

export default PersonCard;
