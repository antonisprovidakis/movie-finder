import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PosterMovieCard.css';
import { Card, Image } from 'semantic-ui-react';
import Rating from './Rating';
import { createImageSrc } from '../api/config';
import { formatDate } from '../utils/date';

function PosterMovieCard({ movie, className, ...rest }) {
  const {
    title,
    release_date: date,
    poster_path: image,
    vote_average: voteAverage,
    vote_count: voteCount
  } = movie;

  return (
    <Card className={`PosterMovieCard ${className}`} fluid {...rest}>
      <Image
        className="PosterMovieCard__image"
        src={createImageSrc({
          path: image,
          type: 'poster',
          size: 'w500'
        })}
      />
      <Card.Content>
        <Card.Header>
          <div className="PosterMovieCard__title" title={title}>
            {title}
          </div>
        </Card.Header>
        <Card.Meta>
          <div className="PosterMovieCard__date">{formatDate(date)}</div>
          <div className="PosterMovieCard__rating">
            <Rating value={voteCount > 0 ? voteAverage : -1} />
          </div>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}

PosterMovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  className: PropTypes.string
};

PosterMovieCard.defaultProps = {
  className: ''
};

export default PosterMovieCard;
