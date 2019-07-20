import React from 'react';
import PropTypes from 'prop-types';
import '../styles/MovieCard.css';
import { Card, Image } from 'semantic-ui-react';
import Rating from './Rating';
import { createImageSrc } from '../api/config';
import { formatDate } from '../utils/date';
import { truncateOverview } from '../utils/movieCard';

function MovieCard({ movie, type, showOverview, className, ...rest }) {
  const {
    title,
    release_date: date,
    poster_path: posterPath,
    backdrop_path: backdropPath,
    vote_average: voteAverage,
    vote_count: voteCount,
    overview
  } = movie;

  return (
    <Card
      className={`MovieCard MovieCard--${type} ${className}`}
      fluid
      {...rest}
    >
      <Image
        className="MovieCard__image"
        src={createImageSrc({
          path: type === 'poster' ? posterPath : backdropPath,
          type,
          size: type === 'poster' ? 'w500' : 'w780'
        })}
      />
      <Card.Content>
        <Card.Header>
          <div className="MovieCard__title" title={title}>
            {title}
          </div>
        </Card.Header>
        <Card.Meta>
          <div className="MovieCard__date">{formatDate(date)}</div>
          <div className="MovieCard__rating">
            <Rating value={voteCount > 0 ? voteAverage : -1} />
          </div>
        </Card.Meta>
        {type === 'backdrop' && showOverview && (
          <Card.Description>
            <div className="MovieCard__overview">
              {truncateOverview(overview)}
            </div>
          </Card.Description>
        )}
      </Card.Content>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['poster', 'backdrop']),
  showOverview: PropTypes.bool,
  className: PropTypes.string
};

MovieCard.defaultProps = {
  type: 'poster',
  showOverview: false,
  className: ''
};

export default MovieCard;
