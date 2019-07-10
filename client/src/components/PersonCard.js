import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PersonCard.css';
import { Card, Image } from 'semantic-ui-react';
import { createImageSrc } from '../api/config';

function PersonCard({ name, image, sub, className, ...rest }) {
  return (
    <Card className={`PersonCard ${className}`} fluid {...rest}>
      <Image
        className="PersonCard__image"
        src={createImageSrc({
          path: image,
          type: 'profile',
          size: 'h632'
        })}
      />
      <Card.Content>
        <Card.Header>
          <div className="PersonCard__name" title={name}>
            {name}
          </div>
        </Card.Header>
        {sub.length > 0 && (
          <Card.Meta className="PersonCard__sub" title={sub}>
            {sub}
          </Card.Meta>
        )}
      </Card.Content>
    </Card>
  );
}

PersonCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  sub: PropTypes.string,
  className: PropTypes.string
};

PersonCard.defaultProps = {
  image: '',
  sub: '',
  className: ''
};

export default PersonCard;
